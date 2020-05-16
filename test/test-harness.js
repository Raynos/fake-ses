'use strict'

const AWS = require('aws-sdk')
const tape = require('@pre-bundled/tape')
const tapeCluster = require('tape-cluster')

const { FakeSESServer } = require('../index.js')

/** @typedef {import('../index').EmailInfo} EmailInfo */

class TestHarness {
  constructor () {
    /** @type {FakeSESServer} */
    this.sesServer = new FakeSESServer({ port: 0 })
    /** @type {AWS.SES | null} */
    this.ses = null
  }

  /** @returns {Promise<void>} */
  async bootstrap () {
    const hostPort = await this.sesServer.bootstrap()

    this.ses = new AWS.SES({
      region: 'us-east-1',
      endpoint: `http://${hostPort}`,
      sslEnabled: false,
      accessKeyId: '123',
      secretAccessKey: 'abc'
    })
  }

  /** @returns {Promise<void>} */
  async close () {
    await this.sesServer.close()
  }

  /**
   * @param {AWS.SES.Types.SendEmailRequest} params
   * @returns {Promise<AWS.SES.Types.SendEmailResponse>}
   */
  async sendEmail (params) {
    if (!this.ses) {
      throw new Error('must call bootstrap()')
    }

    return this.ses.sendEmail(params).promise()
  }

  /**
   * @param {AWS.SES.Types.SendRawEmailRequest} params
   * @returns {Promise<AWS.SES.Types.SendRawEmailResponse>}
   */
  async sendRawEmail (params) {
    if (!this.ses) {
      throw new Error('must call bootstrap()')
    }

    return this.ses.sendRawEmail(params).promise()
  }

  /**
   * @param {number} count
   * @returns {Promise<void>}
   */
  async waitForEmails (count) {
    return this.sesServer.waitForEmails(count)
  }

  /** @returns {EmailInfo[]} */
  getEmails () {
    return this.sesServer.getEmails()
  }
}
exports.TestHarness = TestHarness

exports.test = tapeCluster(tape, TestHarness)
