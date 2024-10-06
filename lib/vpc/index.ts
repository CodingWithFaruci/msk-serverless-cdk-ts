import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {Construct} from "constructs";

export class MskVpc extends ec2.Vpc {
    constructor(scope: Construct, id: string) {
        super(scope, id, {
            vpcName: id,
            natGateways: 1,
            subnetConfiguration: [
                { name: 'public', cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC },
                { name: 'private', cidrMask: 24, subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
            ]
        });
    }
}