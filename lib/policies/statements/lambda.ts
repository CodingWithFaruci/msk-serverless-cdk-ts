import * as iam from 'aws-cdk-lib/aws-iam';

export class LambdaStatement extends iam.PolicyStatement {
    constructor() {
        super({
            actions: ['lambda:InvokeFunction'],
            resources: ['*'],
        });
    }
}