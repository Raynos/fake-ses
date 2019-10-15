'use strict';

import * as AWS from 'aws-sdk';
import * as tape from 'tape';
import * as tapeCluster from 'tape-cluster';

import { FakeSESServer, EmailInfo } from '../src/index';

export class TestHarness {
    sesServer: FakeSESServer;
    ses: AWS.SES | null;

    constructor() {
        this.sesServer = new FakeSESServer({ port: 0 });
        this.ses = null;
    }

    async bootstrap(): Promise<void> {
        const hostPort = await this.sesServer.bootstrap();

        this.ses = new AWS.SES({
            region: 'us-east-1',
            endpoint: `http://${hostPort}`,
            sslEnabled: false,
            accessKeyId: '123',
            secretAccessKey: 'abc'
        });
    }

    async close(): Promise<void> {
        await this.sesServer.close();
    }

    async sendEmail(
        params: AWS.SES.Types.SendEmailRequest
    ): Promise<AWS.SES.Types.SendEmailResponse> {
        if (!this.ses) {
            throw new Error('must call bootstrap()');
        }

        return this.ses.sendEmail(params).promise();
    }

    async sendRawEmail(
        params: AWS.SES.Types.SendRawEmailRequest
    ): Promise<AWS.SES.Types.SendRawEmailResponse> {
        if (!this.ses) {
            throw new Error('must call bootstrap()');
        }

        return this.ses.sendRawEmail(params).promise();
    }

    async waitForEmails(count: number): Promise<void> {
        return this.sesServer.waitForEmails(count);
    }

    getEmails(): EmailInfo[] {
        return this.sesServer.getEmails();
    }
}

export const test = tapeCluster(tape, TestHarness);
