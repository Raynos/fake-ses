'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const tape = require("tape");
const tapeCluster = require("tape-cluster");
const index_1 = require("../src/index");
class TestHarness {
    constructor() {
        this.sesServer = new index_1.FakeSESServer({ port: 0 });
        this.ses = null;
    }
    async bootstrap() {
        const hostPort = await this.sesServer.bootstrap();
        this.ses = new AWS.SES({
            region: 'us-east-1',
            endpoint: `http://${hostPort}`,
            sslEnabled: false,
            accessKeyId: '123',
            secretAccessKey: 'abc'
        });
    }
    async close() {
        await this.sesServer.close();
    }
    async sendEmail(params) {
        if (!this.ses) {
            throw new Error('must call bootstrap()');
        }
        return this.ses.sendEmail(params).promise();
    }
    async sendRawEmail(params) {
        if (!this.ses) {
            throw new Error('must call bootstrap()');
        }
        return this.ses.sendRawEmail(params).promise();
    }
    async waitForEmails(count) {
        return this.sesServer.waitForEmails(count);
    }
    getEmails() {
        return this.sesServer.getEmails();
    }
}
exports.TestHarness = TestHarness;
exports.test = tapeCluster(tape, TestHarness);
//# sourceMappingURL=test-harness.js.map