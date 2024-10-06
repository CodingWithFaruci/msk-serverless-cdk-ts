import * as iam from 'aws-cdk-lib/aws-iam';
import {Construct} from "constructs";
import {LoggingStatement} from "./statements/logging";
import {NetworkStatement} from "./statements/network";
import {GlueAdminStatement, GlueStatement} from "./statements/glue";
import {MskClusterAdminStatement, MskClusterStatement} from "./statements/kafka-cluster";
import {MskGroupAdminStatement, MskGroupStatement} from "./statements/kafka-group";
import {MskTopicAdminStatement, MskTopicReadStatement, MskTopicWriteStatement} from "./statements/kafka-topic";
import {LambdaStatement} from "./statements/lambda";

export type MskPolicyProps = {
    clusterName: string;
    registryName: string;
    topicName: string;
}

export type MskAdminPolicyProps = Omit<MskPolicyProps, 'topicName'>

export class MskConsumerPolicy extends iam.Policy {
    constructor(scope: Construct, id:string, props:MskPolicyProps) {
        super(scope, id, {
            policyName: id,
            statements: [
                new MskClusterStatement(props.clusterName),
                new MskTopicReadStatement(props.clusterName, props.topicName),
                new MskGroupStatement(props.clusterName),
                new GlueStatement(props.registryName),
                new NetworkStatement(),
                new LoggingStatement()
            ]
        });
    }
}

export class MskProducerPolicy extends iam.Policy {
    constructor(scope: Construct, id:string, props:MskPolicyProps) {
        super(scope, id, {
            policyName: id,
            statements: [
                new MskClusterStatement(props.clusterName),
                new MskTopicWriteStatement(props.clusterName, props.topicName),
                new MskGroupStatement(props.clusterName),
                new GlueStatement(props.registryName),
                new NetworkStatement(),
                new LoggingStatement()
            ]
        });
    }
}

export class MskAdminPolicy extends iam.Policy {
    constructor(scope: Construct, id:string, props:MskAdminPolicyProps) {
        super(scope, id, {
            policyName: id,
            statements: [
                new MskClusterAdminStatement(props.clusterName),
                new MskTopicAdminStatement(props.clusterName),
                new MskGroupAdminStatement(props.clusterName),
                new GlueAdminStatement(props.registryName),
                new NetworkStatement(),
                new LoggingStatement(),
                new LambdaStatement()
            ]
        });
    }
}