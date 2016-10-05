var AWS = require('aws-sdk');
var _ = require('underscore');
var ec2 = new AWS.EC2({ apiVersion: '2016-09-15' });
AWS.config.region = 'us-east-1';

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);
    var r;
    var i;
    var instanceIds = [];

    var params = {
        Filters: [{
                Name: 'tag-key',
                Values: [
                    'IoT Enabled'
                ]
            },
        ]
    };

    ec2.describeInstances(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            context.fail('Error occurred.  Aborting.');
            return;
        }

        if (data.Reservations.length) {
            for (r in data.Reservations) {
                if (data.Reservations[r].Instances.length) {
                    for (i in data.Reservations[r].Instances) {
                        if (event.clickType === 'SINGLE') {
                            if (!_.contains(['running', 'pending'], data.Reservations[r].Instances[i].State.Name)) {
                                instanceIds.push(data.Reservations[r].Instances[i].InstanceId);
                            }
                        } else if (event.clickType === 'DOUBLE') {
                            if (!_.contains(['shutting-down', 'terminated', 'stopped', 'stopping'], data.Reservations[r].Instances[i].State.Name)) {
                                instanceIds.push(data.Reservations[r].Instances[i].InstanceId);
                            }
                        }
                    }
                }
            }
        }

        i = '';
        if (instanceIds.length) {
            if (event.clickType === 'SINGLE') {
                ec2.startInstances({ InstanceIds: instanceIds }, function(err, data) {
                    if (!err) {
                        context.succeed({'msg': 'All affected instances started successfully.', 'instanceIds': instanceIds});
                    } else {
                        console.log(err, err.stack);
                        context.fail({'msg': 'Instances failed to start.', 'instanceIds': instanceIds});
                    }
                });
            } else if (event.clickType === 'DOUBLE') {
                ec2.stopInstances({ InstanceIds: instanceIds }, function(err, data) {
                    if (!err) {
                        context.succeed({'msg': 'All affected instances stopped successfully.', 'instanceIds': instanceIds});
                    } else {
                        console.log(err, err.stack);
                        context.fail({'msg': 'Instances failed to stop.', 'instanceIds': instanceIds});
                    }
                });
            }
        } else {
            context.succeed({'msg': 'No instances in a state to be affected by this operation.', 'instanceIds': instanceIds});
        }
    });

};
