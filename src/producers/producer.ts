import * as kafka from 'kafkajs';
import { KafkaClient } from "../utils/kafka-client";

let client: kafka.Kafka;

export const handler = async (event: any) => {
    if (!client) client = KafkaClient('msk-producer', process.env.BOOTSTRAP_SERVER!, process.env.AWS_REGION!);

    try {
        const producer = client.producer({});
        await producer.connect();

        await producer.send({
            topic: process.env.TOPIC_NAME!,
            messages: [
                { value: 'Hello Msk Serverless!' }
            ],
        });

        console.log('Message sent');
        await producer.disconnect();
    } catch (error) {
        console.error(error);
    }
};