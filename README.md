# iot-button-ec2-controller
Allows the start/stop of EC2 instances using an AWS IoT button

The project provides code for a Lambda function (written using Node.js) that allows a properly configured [AWS IoT button](https://aws.amazon.com/iot/button/) to start and stop properly tagged EC2 instances.

Grunt is used to deploy packaged code to Lambda (check out the awesome [grunt-aws-lambda](https://github.com/Tim-B/grunt-aws-lambda) project).

Initial development of this project was funded by Brent Ozar of [Brent Ozar Unlimited](https://www.brentozar.com).
