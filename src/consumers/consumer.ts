import * as base64 from 'base-64';
import { MSKEvent } from 'aws-lambda';

export const handler = async (event: MSKEvent) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const partitions = Object.keys(event.records);
    for (const partition of partitions) {
        const records = event.records[partition];

        for (const record of records) {
            const decodedValue = base64.decode(record.value);
            console.log('Decoded value:', decodedValue);
        }
    }

    return event;
};