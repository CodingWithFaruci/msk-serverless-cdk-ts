import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MskGroupStatement extends iam.PolicyStatement {
    constructor(clusterName:string) {
        super({
            actions: [
                "kafka-cluster:AlterGroup",
                "kafka-cluster:DescribeGroup",
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:group/${clusterName}/*`],
        });
    }
}

export class MskGroupAdminStatement extends iam.PolicyStatement {
    constructor(clusterName:string) {
        super({
            actions: [
                "kafka-cluster:*Group",
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:group/${clusterName}/*`],
        });
    }
}