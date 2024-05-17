import * as schema from '../src';

export const document = (): typeof schema.document.$inferInsert => {
    return {
        documentId: '1',
        data: Buffer.from(''),
    };
};
