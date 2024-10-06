import * as glue from '@aws-sdk/client-glue';

export const GetSchemaDefinition = async (schemaName: string) => {
    const glueClient = new glue.GlueClient({ region: process.env.AWS_REGION });
    const command = new glue.GetSchemaVersionCommand({
        SchemaId: { RegistryName: process.env.REGISTRY_NAME, SchemaName: schemaName },
        SchemaVersionNumber: { LatestVersion: true }
    });
    const response = await glueClient.send(command);
    return response.SchemaDefinition;
};