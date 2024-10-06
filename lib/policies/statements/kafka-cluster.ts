import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MskClusterStatement extends iam.PolicyStatement {
    constructor(clusterName:string) {
        super({
            actions: [
                "kafka-cluster:Connect",
                "kafka-cluster:DescribeCluster",
                "kafka-cluster:DescribeClusterV2",
                "kafka:GetBootstrapBrokers",
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:cluster/${clusterName}/*`],
        });
    }
}

export class MskClusterAdminStatement extends iam.PolicyStatement {
    constructor(clusterName:string) {
        super({
            actions: [
                "kafka-cluster:Connect",
                "kafka-cluster:DescribeCluster",
                "kafka-cluster:DescribeClusterV2",
                "kafka:GetBootstrapBrokers",
                "kafka-cluster:AlterCluster"
            ],
            resources: [`arn:aws:kafka:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:cluster/${clusterName}/*`],
        });
    }
}