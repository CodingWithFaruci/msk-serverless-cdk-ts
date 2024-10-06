import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {MskVpc} from "./vpc";
import {MskSecurityGroup} from "./sg";
import {AddSSTInterface} from "./interface";
import {MskServerlessCluster} from "./cluster";
import {MskRegistry} from "./registry";
import {MskAdminRole, MskConsumerRole, MskProducerRole} from "./roles";
import {MskLambda, MskVpcLambda} from "./lambda";
import {AddMskEventSource} from "./events";
import {Trigger} from "./cr";
import {MskServerlessCdkTsStackProps} from "../bin/types";

export class MskServerlessCdkTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MskServerlessCdkTsStackProps) {
    super(scope, id, props);

    // create new VPC and Security Group
    const vpc = new MskVpc(this, 'msk-vpc');
    const securityGroup = new MskSecurityGroup(this, 'msk-sg', vpc);

    // add SST interface endpoint to VPC
    AddSSTInterface(vpc, securityGroup);

    // create MSK Serverless Cluster
    const cluster = new MskServerlessCluster(this, 'msk-cluster', {
      vpc,
      securityGroupId: securityGroup.securityGroupId
    });

    // create Glue Schema Registry
    const registry = new MskRegistry(this, props.registryName);

    // create producers for MSK
    props.producers.map((producer) => {
      const producerRole = new MskProducerRole(this, `msk-p-role-${producer.topic}`, {
        topicName: producer.topic,
        clusterName: cluster.clusterName,
        registryName: registry.name
      });
      new MskVpcLambda(this, `msk-producer-${producer.topic}`, {
        vpc,
        securityGroup,
        role: producerRole,
        entry: producer.entry,
        environment: producer.environment
      });
    });

    // create consumers for MSK
    props.consumers.map((consumer) => {
      const consumerRole = new MskConsumerRole(this, `msk-c-role-${consumer.topic}`, {
        topicName: consumer.topic,
        clusterName: cluster.clusterName,
        registryName: registry.name,
      });
      const consumerLambda = new MskLambda(this, `msk-consumer-${consumer.topic}`, {
        role: consumerRole,
        entry: consumer.entry,
        environment: consumer.environment
      });
      AddMskEventSource(consumerLambda, cluster.ref, consumer.topic);
    })

    // create admin IAM role for MSK
    const adminRole = new MskAdminRole(this, 'msk-admin-role', {
      clusterName: cluster.clusterName,
      registryName: registry.name
    });

    // admin workers for creating topics and trigger on updates
    const topicManager = new MskVpcLambda(this, 'msk-topic-manager', {
      vpc,
      securityGroup,
      role: adminRole,
      entry: 'src/admin/topic-manager.ts',
      environment: { BOOTSTRAP_SERVER: props.boostrapServer }
    });
    new Trigger(this, 'msk-topic-trigger', topicManager);
    
    // admin workers for creating schemas and trigger on updates
    const schemaManager = new MskLambda(this, 'msk-schema-manager', {
      role: adminRole,
      entry: 'src/admin/schema-manager.ts',
      environment: { REGISTRY_ARN: registry.attrArn }
    });
    new Trigger(this, 'msk-schema-trigger', schemaManager);
  }
}
