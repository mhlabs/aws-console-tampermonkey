# aws-console-tampermonkey
Tampermonkey script to let you know what account you're logged into and with what permission set. It will colour code your AWS console's top bar based on a hash of your account name.

![Screenshot](https://github.com/mhlabs/aws-console-tampermonkey/blob/master/sso-tampermonkey.png?raw=true)

## Install
1. Install (Tampermonkey)[https://tampermonkey.net/]
2. Copy content of (script.js)[https://github.com/mhlabs/aws-console-tampermonkey/blob/master/script.js]
3. In your browser, click the Tampermonkey icon and select "Create a new script"
4. Paste script and hit save

Done!

## Note
This is intended to work with the default Control Tower / AWS SSO setup where the looged in account name shows as `AWSReservedSSO_RoleName_12345abcdef...`
