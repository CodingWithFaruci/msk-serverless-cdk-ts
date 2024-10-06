import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {Construct} from "constructs";

export class MskSecurityGroup extends ec2.SecurityGroup {
    constructor(scope: Construct, id: string, vpc: ec2.IVpc) {
        super(scope, id, {
            vpc,
            securityGroupName: id,
            allowAllOutbound: true,
        });

        this.addIngressRule(this, ec2.Port.tcp(9098), 'Allow internal traffic on port 9098');
    }
}