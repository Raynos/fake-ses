'use strict'

const test = require('./test-harness').test

/** @typdef {import('aws-sdk)} AWS */

test('sending an email', async (server, assert) => {
  const resp = await server.sendEmail({
    Destination: {
      ToAddresses: ['my-friend@gmail.com']
    },
    Message: {
      Body: {
        Text: {
          Data: 'my body'
        }
      },
      Subject: {
        Data: 'my subject'
      }
    },
    Source: 'me@gmail.com'
  })

  await server.waitForEmails(1)

  const emails = server.getEmails()
  assert.equal(emails.length, 1)
  const e = emails[0]
  assert.equal(e.id, resp.MessageId)
  assert.equal(e.body.Action, 'SendEmail')
  assert.equal(e.body.Source, 'me@gmail.com')
  assert.equal(
    e.body['Destination.ToAddresses.member.1'],
    'my-friend@gmail.com'
  )
  assert.equal(e.body['Message.Body.Text.Data'], 'my body')
  assert.equal(e.body['Message.Subject.Data'], 'my subject')
})

test('sending multiple emails', async (server, assert) => {
  // Send in background
  const p = (async () => {
    await server.sendEmail(makeEmailReq('msg 1'))
    await server.sendEmail(makeEmailReq('msg 2'))
    await server.sendEmail(makeEmailReq('msg 3'))
  })()

  await server.waitForEmails(3)
  const emails = server.getEmails()

  assert.equal(emails.length, 3)
  assert.equal(emails[0].body['Message.Body.Text.Data'], 'msg 1')
  assert.equal(emails[1].body['Message.Body.Text.Data'], 'msg 2')
  assert.equal(emails[2].body['Message.Body.Text.Data'], 'msg 3')

  await p
})

test('sending raw email', async (server, assert) => {
  const resp = await server.sendRawEmail({
    Destinations: ['To:my-friend@gmail.com'],
    RawMessage: {
      Data: 'raw message'
    },
    Source: 'me@gmail.com'
  })

  await server.waitForEmails(1)

  const emails = server.getEmails()
  assert.equal(emails.length, 1)
  const e = emails[0]
  assert.equal(e.id, resp.MessageId)
  assert.equal(e.body.Action, 'SendRawEmail')
  assert.equal(e.body.Source, 'me@gmail.com')
  assert.equal(
    e.body['Destinations.member.1'],
    'To:my-friend@gmail.com'
  )
  const rawMsg = e.body['RawMessage.Data']
  const buf = Buffer.from(rawMsg, 'base64')
  assert.equal(buf.toString('utf8'), 'raw message')
})

/**
 * @param {string} body
 * @returns {AWS.SES.Types.SendEmailRequest}
 */
function makeEmailReq (body) {
  return {
    Destination: {
      ToAddresses: ['my-friend@gmail.com']
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: 'my subject'
      }
    },
    Source: 'me@gmail.com'
  }
}
