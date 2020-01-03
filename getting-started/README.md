# Getting Started with Serverless framework

https://serverless.com/blog/anatomy-of-a-serverless-app/

Create services subfolder

Create project from template:
`serverless create --template aws-nodejs --path email-service`

## Setup

`npm init`

Update the test file `send-email-data.json` with the desired recipient email.

## Invoke Locally

```
cd services/email-service
serverless invoke local --function send
```

## Invoke Live

```
curl -X POST https://<shown-in-console-upon-deploy> -d '{}'
```
or
```
curl -X POST https://wggvfq4htb.execute-api.us-east-1.amazonaws.com/prod/email -d '{"to_address":"royce.remulla@outlook.com"}'
```

## Linting

`eslint --init`
