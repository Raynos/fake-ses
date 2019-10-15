"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const querystring = require("querystring");
const util = require("util");
const sync_wait_group_1 = require("./sync-wait-group");
class FakeSESServer {
    constructor(options = {}) {
        this.emails = [];
        this.httpServer = http.createServer();
        this.port = options.port || 0;
        this.hostPort = null;
        this.emailCount = 0;
        this.waiters = [];
    }
    async bootstrap() {
        if (!this.httpServer) {
            throw new Error('cannot bootstrap closed server');
        }
        this.httpServer.on('request', (req, res) => {
            this.handleServerRequest(req, res);
        });
        const server = this.httpServer;
        await util.promisify((cb) => {
            server.listen(this.port, cb);
        })();
        const addr = this.httpServer.address();
        if (!addr || typeof addr === 'string') {
            throw new Error('invalid http server address');
        }
        this.hostPort = `localhost:${addr.port}`;
        return this.hostPort;
    }
    async close() {
        if (this.httpServer === null) {
            return;
        }
        const server = this.httpServer;
        await util.promisify((cb) => {
            server.close(cb);
        })();
        this.httpServer = null;
    }
    getEmails() {
        return this.emails.slice();
    }
    async waitForEmails(count) {
        if (this.emailCount >= count) {
            return;
        }
        const maybeWaiter = this.waiters[count];
        if (maybeWaiter) {
            return maybeWaiter.wait();
        }
        const w = this.waiters[count] = new sync_wait_group_1.WaitGroup();
        w.add(1);
        return w.wait();
    }
    handleServerRequest(req, res) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = querystring.parse(body);
            const xml = this.handleMessage(params.Action, params);
            if (!xml) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(xml);
        });
    }
    handleMessage(action, params) {
        switch (action) {
            case 'SendEmail':
                return this.handleEmail(params);
            case 'SendRawEmail':
                return this.handleRawEmail(params);
            default:
                return null;
        }
    }
    handleEmail(params) {
        if (!params.Source ||
            !params['Message.Subject.Data'] ||
            !(params['Message.Body.Html.Data'] ||
                params['Message.Body.Text.Data']) ||
            !params['Destination.ToAddresses.member.1']) {
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
    handleRawEmail(params) {
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
    checkWaiters() {
        const w = this.waiters[this.emailCount];
        if (w) {
            this.waiters[this.emailCount] = null;
            w.done();
        }
    }
}
exports.FakeSESServer = FakeSESServer;
function cuuid() {
    // tslint:disable-next-line: insecure-random
    const str = (Date.now().toString(16) + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0, 32);
    return str.slice(0, 8) + '-' + str.slice(8, 12) + '-' + str.slice(12, 16) + '-' + str.slice(16, 20) + '-' + str.slice(20);
}
//# sourceMappingURL=index.js.map