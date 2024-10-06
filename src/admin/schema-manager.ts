import * as glue from '@aws-sdk/client-glue';

export const handler = async () => {
    const client = new glue.GlueClient({ region: process.env.AWS_REGION });

    const command = new glue.CreateSchemaCommand({
        SchemaName: 'TestSchema',
        DataFormat: glue.DataFormat.AVRO,
        SchemaDefinition: JSON.stringify({
            type: 'record',
            namespace: 'FarukAda',
            name: 'TestSchema',
            fields: [
                { name: 'name', type: 'string' },
                { name: 'age', type: 'int' },
                { name: 'email', type: 'string', default: 'no@email.com' },
            ],
        }),
        RegistryId: {
            RegistryArn: process.env.REGISTRY_ARN,
        },
        Compatibility: glue.Compatibility.FULL,
    });

    const response = await client.send(command);
    console.log(response.$metadata.httpStatusCode);
    return response;
};