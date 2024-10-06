import * as kafka from "kafkajs";
import * as auth from "aws-msk-iam-sasl-signer-js";

const oauthBearerTokenProvider = async (region:string) => {
    const authTokenResponse = await auth.generateAuthToken({ region });
    return { value: authTokenResponse.token };
};

export const KafkaClient = (id:string, bootstrapServer:string, region:string) => {
    return new kafka.Kafka({
        clientId: id,
        brokers: [bootstrapServer],
        ssl: true,
        sasl: {
            mechanism: 'oauthbearer',
            oauthBearerProvider: () => oauthBearerTokenProvider(region)
        },
        logLevel: kafka.logLevel.ERROR
    });
};