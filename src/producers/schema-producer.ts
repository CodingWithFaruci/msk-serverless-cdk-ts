import * as kafka from 'kafkajs';
import { EncodeMessage } from "../utils/avro";
import { KafkaClient } from "../utils/kafka-client";
import { GetSchemaDefinition } from "../utils/registry-client";

let client: kafka.Kafka;

export const handler = async (event: any) => {
    if (!client) client = KafkaClient('msk-schema-producer', process.env.BOOTSTRAP_SERVER!, process.env.AWS_REGION!);

    try {
        const message = { name: 'Faruk Ada', age: 35 };
        const schemaDefinition = await GetSchemaDefinition(process.env.SCHEMA_NAME!);
        console.log(schemaDefinition);

        const encodedMessage = EncodeMessage(message, schemaDefinition!);
        console.log(encodedMessage);

        const producer = client.producer({});
        await producer.connect();

        await producer.send({
            topic: process.env.TOPIC_NAME!,
            messages: [{ value: encodedMessage.toString() }],
        });

        console.log('Message sent');
        await producer.disconnect();
    } catch (error) {
        console.error(error);
    }
};