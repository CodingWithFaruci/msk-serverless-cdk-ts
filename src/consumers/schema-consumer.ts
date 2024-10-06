import * as base64 from "base-64";
import { MSKEvent } from 'aws-lambda';
import { DecodeMessage } from "../utils/avro";
import { GetSchemaDefinition } from "../utils/registry-client";

export const handler = async (event: MSKEvent) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const schemaDefinition = await GetSchemaDefinition(process.env.SCHEMA_NAME!);

    try {
        const partitions = Object.keys(event.records);
        for (const partition of partitions) {
            const records = event.records[partition];

            for (const record of records) {
                const value = base64.decode(record.value);
                console.log('Base64 decoded value:', value);

                const decodedValue = DecodeMessage(Buffer.from(value), schemaDefinition!);
                console.log('Buffer decoded value:', decodedValue);
            }
        }
    } catch (error) {
        console.error(error);
    }

    return event;
};