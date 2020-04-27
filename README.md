# aws-console-tampermonkey

## Install
1. Install [Tampermonkey](https://tampermonkey.net/)
2. Copy content of desired script under [/scripts](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/scripts)
3. In your browser, click the Tampermonkey icon and select "Create a new script"
4. Paste script and hit save

Done!

# Scripts

## AWS SSO Account Alert (aws-sso-account-alert.js)
Tampermonkey script to let you know what account you're logged into and with what permission set. It will colour code your AWS console's top bar based on a hash of your account name.

![Screenshot](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/images/sso-tampermonkey.png?raw=true)

### Note
This is intended to work with the AWS Single Sign-On setup where the logged in user shows as `AWSReservedSSO_RoleName_12345abcdef...`

## Scripts to bridge Lambda, CloudWatch Logs and CloudWatch Logs Insights
AWS CloudWatch Insights is a great tool for searching and analysing CloudWatch log events. However, it's not logically linked together in the AWS console. 

These three scripts solve three separate, but related navigation use cases;
1. Quickly navigate from a Lambda function to its Insights console.
2. Quickly navigate from a CloudWatch log group to its Insights console.
3. Navigate from a specific log event in Insights to its place in its logstream to see what lead to the log and what impact it had after.

### AWS Lambda to Logs Insights (lambda-to-insights.js)
Adds a button that links to the CloudWatch Logs Insights console for the current Lambda function 

![Screenshot](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/images/lambda-to-insights.png?raw=true)

### AWS CloudWatch Logs to Logs Insights (cloudwatch-logs-to-insights.js) 
Adds a link to the Insights console from the breadcrumbs in CloudWatch Logs 

![Screenshot](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/images/logs-to-insights.png?raw=true)

### AWS CloudWatch Logs Insights to Log Stream (cloudwatch-insights-to-log-stream.js) 
Adds a link to a log row in Insights that leads to the log in its log stream. Useful when you want to see a logged event in its context.

![Screenshot](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/images/insights-to-log-stream.png?raw=true)

