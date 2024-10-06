import * as avro from 'avsc';

export const EncodeMessage = (message:any, schemaDefinition:string) => {
    const avroType = avro.Type.forSchema(JSON.parse(schemaDefinition));
    return avroType.toBuffer(message);
};

export const DecodeMessage = (buffer:Buffer, schemaDefinition:string) => {
    const avroType = avro.Type.forSchema(JSON.parse(schemaDefinition));
    return avroType.fromBuffer(buffer);
}