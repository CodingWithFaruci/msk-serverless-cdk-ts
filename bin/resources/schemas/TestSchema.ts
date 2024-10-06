export const TestSchema = {
    type: 'record',
    namespace: 'FarukAda',
    name: 'TestSchema',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'age', type: 'int' },
        { name: 'email', type: 'string', default: 'no@email.com' },
    ],
};