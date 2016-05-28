var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
    lambda_invoke: {
        default: {}
    },
    lambda_deploy: {
        default: {
            arn: 'replace-this-string-with-a-real-value'
        }
    },
    lambda_package: {
        default: {}
    }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy'])
