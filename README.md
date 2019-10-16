# fake-sqs

Runs a fake SES server on a HTTP port.

## Example

```js
const assert = require('assert')
const SESServer = require('fake-ses')
const AWS = require('aws-sdk')

async function test() {
  const myServer = new SESServer({
    port: 0
  })

  await myServer.bootstrap()

  const ses = new AWS.SES({
    region: 'us-east-1',
    endpoint: 'http://' + myServer.hostPort,
    sslEnabled: false,
    accessKyId: '123',
    secretAccessKey: 'abc'
  })

  await ses.sendEmail({
    Destination: {
      ToAddresses: ['my-email@gmail.com']
    },
    Message: {
      Body: {
        Text: { Charset: 'UTF-8', Data: 'test' }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'my email subject'
      }
    }
  }).promise()

  await myServer.waitForEmails(1)

  var msgs = myServer.getEmails()

  assert.equal(msgs[0].Message.Body.Data, 'my message')
  assert.equal(msgs.length, 1)

  await myServer.close()
}

process.on('unhandledRejection', (err) => { throw err })
test()
```

## Docs :

### `const server = new SESServer(opts)`

Create a fake SES server

- `opts.port` ; defaults to 0

### `await server.bootstrap()`

Starts the server.

After bootstrap returns you can read `server.hostPort` to get
the actual listening port of the server.

### `server.getEmails()`

Returns all the emails received by the SES server.

### `await server.waitForEmails(count)`

Get notified once N emails have in total been sent to this fake SES.

### `await server.close()`

Closes the underlying http server.

## install

```
% npm install fake-ses
```

## MIT Licensed

