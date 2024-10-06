import * as iam from 'aws-cdk-lib/aws-iam';

export class NetworkStatement extends iam.PolicyStatement {
    constructor() {
        super({
            actions: [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeVpcs",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
            ],
            resources: ['*'],
        });
    }
}