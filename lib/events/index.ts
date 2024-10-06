import * as events from 'aws-cdk-lib/aws-lambda-event-sources';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export const AddMskEventSource = (
    consumer: nodejs.NodejsFunction,
    clusterRef: string,
    topicName: string,
) => {
    consumer.addEventSource(new events.ManagedKafkaEventSource({
        enabled: true,
        batchSize: 10,
        clusterArn: clusterRef,
        topic: topicName,
        startingPosition: lambda.StartingPosition.LATEST,
    }));
};