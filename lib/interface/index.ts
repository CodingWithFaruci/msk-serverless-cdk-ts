import * as ec2 from 'aws-cdk-lib/aws-ec2';

export const AddSSTInterface = (vpc: ec2.Vpc, securityGroup: ec2.SecurityGroup) => {
    vpc.addInterfaceEndpoint('STSVpcEndpoint', {
        service: ec2.InterfaceVpcEndpointAwsService.STS,
        subnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [securityGroup],
        open: true,
    });
};