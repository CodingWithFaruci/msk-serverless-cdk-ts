import { KafkaClient } from "../utils/kafka-client";
import { TopicsList } from "../../bin/resources";

export const handler = async () => {
    const client = KafkaClient('msk-admin', process.env.BOOTSTRAP_SERVER!, process.env.AWS_REGION!);

    try {
        const admin = client.admin();
        await admin.connect();
        const existingTopics = await admin.listTopics();
        console.log('Existing topics:', existingTopics);

        const topicsToCreate = [];

        for (const topicConfig of TopicsList) {
            if(!existingTopics.includes(topicConfig.topic)) {
                console.log(`Adding topic: ${topicConfig.topic}`);
                topicsToCreate.push(topicConfig);
            }
        }

        if(topicsToCreate.length > 0) {
            await admin.createTopics({ topics: topicsToCreate });
            console.log('Topics added')
        } else {
            console.log('No topics to create');
        }
    } catch (error) {
        console.error(error);
    }
};