import * as iam from 'aws-cdk-lib/aws-iam';
import {Construct} from "constructs";
import {
    MskAdminPolicy,
    MskAdminPolicyProps,
    MskConsumerPolicy,
    MskPolicyProps,
    MskProducerPolicy
} from "../policies";

export class MskConsumerRole extends iam.Role {
    constructor(scope: Construct, id:string, props: MskPolicyProps) {
        super(scope, id, {
            roleName: id,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                'MskConsumerPolicy': new MskConsumerPolicy(scope, `msk-consumer-${props.topicName}-policy`, props).document }
        });
    }
}

export class MskProducerRole extends iam.Role {
    constructor(scope: Construct, id:string, props: MskPolicyProps) {
        super(scope, id, {
            roleName: id,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                'MskProducerPolicy': new MskProducerPolicy(scope, `msk-producer-${props.topicName}-policy`, props).document }
        });
    }
}

export class MskAdminRole extends iam.Role {
    constructor(scope: Construct, id:string, props: MskAdminPolicyProps) {
        super(scope, id, {
            roleName: id,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                'MskAdminPolicy': new MskAdminPolicy(scope, 'msk-admin-policy', props).document }
        });
    }
}