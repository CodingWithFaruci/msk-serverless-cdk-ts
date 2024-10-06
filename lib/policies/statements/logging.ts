import * as iam from 'aws-cdk-lib/aws-iam';

export class LoggingStatement extends iam.PolicyStatement {
    constructor() {
        super({
            actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
            ],
            resources: ['*'],
        });
    }
}