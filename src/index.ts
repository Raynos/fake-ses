import * as http from 'http';
import * as querystring from 'querystring';
import * as util from 'util';

import { WaitGroup } from './sync-wait-group';

export interface Dictionary<T> {
    [key: string]: T;
}

export interface Callback {
    (err?: Error): void;
}

export interface EmailInfo {
    id: string;
    body: Dictionary<string>;
}

export class FakeSESServer {
    private readonly emails: EmailInfo[];
    private httpServer: http.Server | null;
    private readonly port: number;
    private hostPort: string | null;

    private emailCount: number;
    private readonly waiters: (WaitGroup | null)[];

    constructor(options: { port?: number } = {}) {
        this.emails = [];

        this.httpServer = http.createServer();
        this.port = options.port || 0;
        this.hostPort = null;

        this.emailCount = 0;
        this.waiters = [];
    }

    async bootstrap(): Promise<string> {
        if (!this.httpServer) {
            throw new Error('cannot bootstrap closed server');
        }

        this.httpServer.on('request', (
            req: http.IncomingMessage,
            res: http.ServerResponse
        ) => {
            this.handleServerRequest(req, res);
        });

        const server = this.httpServer;
        await util.promisify((cb: Callback) => {
            server.listen(this.port, cb);
        })();

        const addr = this.httpServer.address();
        if (!addr || typeof addr === 'string') {
            throw new Error('invalid http server address');
        }

        this.hostPort = `localhost:${addr.port}`;
        return this.hostPort;
    }

    async close(): Promise<void> {
        if (this.httpServer === null) {
            return;
        }

        const server = this.httpServer;
        await util.promisify((cb: Callback) => {
            server.close(cb);
        })();
        this.httpServer = null;
    }

    getEmails(): EmailInfo[] {
        return this.emails.slice();
    }

    async waitForEmails(count: number): Promise<void> {
        if (this.emailCount >= count) {
            return;
        }

        const maybeWaiter = this.waiters[count];
        if (maybeWaiter) {
            return maybeWaiter.wait();
        }

        const w = this.waiters[count] = new WaitGroup();
        w.add(1);
        return w.wait();
    }

    private handleServerRequest(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): void {
        let body = '';
        req.on('data', (chunk: string) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = <Dictionary<string>> querystring.parse(body);
            const xml = this.handleMessage(params.Action, params);
            if (!xml) {
                res.statusCode = 404;
                res.end('Not Found');
            }

            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(xml);
        });
    }

    private handleMessage(
        action: string, params: Dictionary<string>
    ): string | null {
        switch (action) {
            case 'SendEmail':
                return this.handleEmail(params);

            case 'SendRawEmail':
                return this.handleRawEmail(params);

            default:
                return null;
        }
    }

    private handleEmail(params: Dictionary<string>): string {
        if (!params.Source ||
            !params['Message.Subject.Data'] ||
            !(
                params['Message.Body.Html.Data'] ||
                params['Message.Body.Text.Data']
            ) ||
            !params['Destination.ToAddresses.member.1']
        ) {
            return `<Error>
                <Code>MessageRejected</Code>
                <Message>Missing required params</Message>
            </Error>`;
        }

        const id = cuuid();
        this.emails.push({
            id,
            body: params
        });

        this.emailCount++;
        this.checkWaiters();

        return `<SendEmailResponse>
            <SendEmailResult>
                <MessageId>${id}</MessageId>
            </SendEmailResult>
        </SendEmailResponse>`;
    }

    private handleRawEmail(params: Dictionary<string>): string {
        if (!params['RawMessage.Data']) {
            return `<Error>
                <Code>MessageRejected</Code>
                <Message>Missing required params</Message>
            </Error>`;
        }

        const id = cuuid();
        this.emails.push({
            id,
            body: params
        });

        this.emailCount++;
        this.checkWaiters();

        return `<SendRawEmailResponse>
            <SendRawEmailResult>
                <MessageId>${id}</MessageId>
            </SendRawEmailResult>
        </SendRawEmailResponse>`;
    }

    private checkWaiters(): void {
        const w = this.waiters[this.emailCount];
        if (w) {
            this.waiters[this.emailCount] = null;
            w.done();
        }
    }
}

function cuuid(): string {
    // tslint:disable-next-line: insecure-random
    const str = (Date.now().toString(16) + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0, 32);
    return str.slice(0, 8) + '-' + str.slice(8, 12) + '-' + str.slice(12, 16) + '-' + str.slice(16, 20) + '-' + str.slice(20);
}
