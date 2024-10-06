import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as msk from 'aws-cdk-lib/aws-msk';
import {Construct} from "constructs";

interface MskServerlessClusterProps {
    securityGroupId: string;
    vpc: ec2.IVpc;
}

export class MskServerlessCluster extends msk.CfnServerlessCluster {
    constructor(scope: Construct, id: string, props:MskServerlessClusterProps) {
        super(scope, id, {
            clusterName: id,
            clientAuthentication: { sasl: { iam: { enabled: true } }},
            vpcConfigs: [{
                securityGroups: [props.securityGroupId],
                subnetIds: props.vpc.privateSubnets.map((subnet: any) => subnet.subnetId),
            }],
        });
    }
}