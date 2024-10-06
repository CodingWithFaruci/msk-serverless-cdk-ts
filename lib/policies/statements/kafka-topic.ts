import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MskTopicReadStatement extends iam.PolicyStatement {
    constructor(clusterName:string, topicName:string) {
        super({
            actions: [
                "kafka-cluster:DescribeTopic",
                "kafka-cluster:ReadData"
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topic/${clusterName}/*/${topicName}`],
        });
    }
}

export class MskTopicWriteStatement extends iam.PolicyStatement {
    constructor(clusterName:string, topicName:string) {
        super({
            actions: [
                "kafka-cluster:DescribeTopic",
                "kafka-cluster:WriteData"
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topic/${clusterName}/*/${topicName}`],
        });
    }
}

export class MskTopicAdminStatement extends iam.PolicyStatement {
    constructor(clusterName:string) {
        super({
            actions: [
                "kafka-cluster:*Topic*",
                "kafka-cluster:WriteData",
                "kafka-cluster:ReadData"
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topic/${clusterName}/*`],
        });
    }
}