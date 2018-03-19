# iot-button-ec2-controller
Allows the start/stop of EC2 instances using an AWS IoT button

The project provides code for a Lambda function (written using Node.js) that allows a properly configured [AWS IoT button](https://aws.amazon.com/iot/button/) to start and stop properly tagged EC2 instances.

Grunt is used to deploy packaged code to Lambda (check out the awesome [grunt-aws-lambda](https://github.com/Tim-B/grunt-aws-lambda) project).

Initial development of this project was funded by Brent Ozar of [Brent Ozar Unlimited](https://www.brentozar.com).

### Setup

- Prerequisites
  - An AWS Account
  - Working [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) installation
- Create a new Lambda function in your AWS account.
  -  In the web console, go into the Lambda area and use the "iot-button-email" blueprint to create the new function.
  -  Change the "IoT type" to "IoT Button"; you'll be asked to provide the serial # for the button.
  -  Once you've provided a valid serial #, press the "Generate Certificate and Keys" button.
  -  Save the certificate and key file in a safe place, take a screenshot of the directions and click "Next".
  -  Provide a name for the Lambda function, and alter the description if desired.
  -  Create a new basic execution role (call it something appropriate, like "iot-button-ec2"), copy the contents of policy.json into the policy document area of the new role screen and save; the new role should populate in the role select list back in the Lambda screen.
  -  Set execution time to 10 seconds.
  -  Click "Save" at the bottom of the screen.
  -  On the next screen, check the "Enable Event Source" box, then click the "Create Function" button at the bottom of the screen.
  - Immediately, after the function is created, you'll be taken to a confirmation page.  At the top right corner of this page, you'll see "ARN - {longstringofstuff}".  Copy the `longstringofstuff` part.
- Update Gruntfile.js with the ARN.
  - With the ARN you just copied, replace `replace-this-string-with-a-real-value` with the value you just copied and save the file.
  - If you're deploying your Lambda function to another region, you'll need to update the region along with the ARN mentioned just above.
- Update index.js with the proper region.
  -  If your Lambda is not deployed in the `us-east-1` region, you'll need to update the value accordingly.  Save the file.

### Deploy

Once all the config from the *Setup* section is done, you can deploy.  You'll need to have Node.js installed, as well as Grunt and the grunt-cli.  From within this repo, run `npm install`.  That will download and save locally all required dependencies as outlined in the `package.json` spec file.

Once that step has run, a simple `grunt deploy` will package up all the code into a zip file and send it on its way to Lambda.

### Set Up Your Button

Using the key, certificate file, and screenshot that you got from Lambda earlier (while we were setting up our function), set up your button and get it talking to the 'net.

### Tag Your Instances

Simply creating an `IoT Enabled` tag is enough to make the EC2 instance work with this.  If you'd rather use another tag key, you'll need to alter index.js accordingly.

### Try It Out!

A single button press will turn on tagged instances if they're not already running.  A double button press will turn off tagged instances if they're not already shutdown.

### Enjoy!


## TODO

There are still a few things I'd like to do, such as moving config to an external file and writing a few tests (though tests were run from within the Lambda interface), tightening up the permissions in the policy.json file, and figuring out what an appropriate long button push event might be and writing code to support that.
