import {MskServerlessCdkTsStackProps} from "./types";
import {TestTopic} from "./resources/topics/TestTopic";
import {TestSchemaTopic} from "./resources/topics/TestSchemaTopic";

const BOOTSTRAP_SERVER = 'boot-6t99iosl.c2.kafka-serverless.eu-west-1.amazonaws.com:9098';
const REGISTRY_NAME = 'msk-registry';

export const config: MskServerlessCdkTsStackProps = {
    boostrapServer: BOOTSTRAP_SERVER,
    registryName: REGISTRY_NAME,
    producers: [
        {
            topic: TestTopic.topicConfig.topic,
            entry: 'src/producers/producer.ts',
            environment: {
                TOPIC_NAME: TestTopic.topicConfig.topic,
                BOOTSTRAP_SERVER: BOOTSTRAP_SERVER,
            },
        },
        {
            topic: TestSchemaTopic.topicConfig.topic,
            entry: 'src/producers/schema-producer.ts',
            environment: {
                TOPIC_NAME: TestSchemaTopic.topicConfig.topic,
                BOOTSTRAP_SERVER: BOOTSTRAP_SERVER,
                SCHEMA_NAME: TestSchemaTopic.schema.name,
                REGISTRY_NAME: REGISTRY_NAME,
            },
        },
    ],
    consumers: [
        {
            topic: TestTopic.topicConfig.topic,
            entry: 'src/consumers/consumer.ts',
        },
        {
            topic: TestSchemaTopic.topicConfig.topic,
            entry: 'src/consumers/schema-consumer.ts',
            environment: {
                SCHEMA_NAME: TestSchemaTopic.schema.name,
                REGISTRY_NAME: REGISTRY_NAME,
            },
        },
    ],
};