import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import {Construct} from "constructs";

type MskLambdaProps = {
    role: iam.Role;
    entry: string;
    environment?: { [key: string]: string };
}

interface MskVpcLambdaProps extends MskLambdaProps {
    vpc: ec2.IVpc;
    securityGroup: ec2.SecurityGroup;
}

export class MskLambda extends nodejs.NodejsFunction {
    constructor(scope: Construct, id: string, props: MskLambdaProps) {
        super(scope, id, {
            functionName: id,
            role: props.role,
            entry: props.entry,
            runtime: lambda.Runtime.NODEJS_20_X,
            environment: props.environment,
            logRetention: 1,
        });
    }
}

export class MskVpcLambda extends nodejs.NodejsFunction {
    constructor(scope: Construct, id: string, props: MskVpcLambdaProps) {
        super(scope, id, {
            functionName: id,
            role: props.role,
            entry: props.entry,
            runtime: lambda.Runtime.NODEJS_20_X,
            vpc: props.vpc,
            allowPublicSubnet: true,
            securityGroups: [props.securityGroup],
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
            bundling: { nodeModules: ['@smithy/signature-v4'] },
            environment: props.environment,
            logRetention: 1,
        });
    }
}