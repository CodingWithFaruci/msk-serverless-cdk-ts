import {TestSchema} from "../schemas/TestSchema";

export const TestSchemaTopic = {
    topicConfig: {
        topic: 'test-schema-topic',
        numPartitions: 2,
        replicationFactor: 1,
    },
    schema: TestSchema,
};