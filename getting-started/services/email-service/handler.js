'use strict'

const MAILGUN_APIKEY = process.env.MAILGUN_APIKEY
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN


console.log('API_KEY' + process.env.MAILGUN_APIKEY)

const mailgun = require('mailgun-js')({
    apiKey: MAILGUN_APIKEY,
    domain: MAILGUN_DOMAIN
})

const fromAddress    = `<demo@${MAILGUN_DOMAIN}>`
const subjectText    = 'Serverless Email Demo'
const messageText    = 'Sample email sent from Serverless Email Demo.'
const messageHtml    = `
<html>
  <title>Serverless Email Demo</title>
  <body>
    <div>
      <h1>Serverless Email Demo</h1>
      <span>Sample email sent from Serverless Email Demo.</span>
    </div>
  </body>
</html>
`

// module.exports.sendEmail = async event => {
module.exports.sendEmail = (event, context, callback) => {
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(
    //         {
    //             message: 'Go Serverless v1.0! Your function executed successfully!',
    //             input: event,
    //         },
    //         null,
    //
    //     ),
    // }

    var toAddress = ''
    if (event.body) {
        try {
            toAddress = JSON.parse(event.body).to_address || ''
        } catch (e) {
            console.log(e)
        }
    }

    if (toAddress !== '') {
        const emailData = {
            from: fromAddress,
            to: toAddress,
            subject: subjectText,
            text: messageText,
            html: messageHtml
        }

        // send email
        mailgun.messages().send(emailData, (error, body) => {
            if (error) {
                // // log error response
                // console.log(error)
                // callback(error)
                const response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: error,
                        input: body,
                    }),
                }
                callback(null, response)
            } else {
                const response = {
                    statusCode: 202,
                    body: JSON.stringify({
                        message: 'Request to send email is successful.',
                        input: body,
                    }),
                }
                console.log(response)
                callback(null, response)
            }
        })
    } else {
        const err = {
            statusCode: 422,
            body: JSON.stringify({
                message: 'Bad input data or missing email address.',
                input: event.body,
            }),
        }
        console.log(err)
        callback(null, err)
    }
}

