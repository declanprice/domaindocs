import { Hocuspocus } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { eq } from 'drizzle-orm';

const server = new Hocuspocus({
    port: 5000,
});

const sql = postgres(process.env['DATABASE_URL'] as string, { max: 1 });

const db = drizzle(sql, { schema });

server.configure({
    extensions: [
        new Database({
            fetch: async ({ documentName }) => {
                const document = await db
                    .select()
                    .from(schema.document)
                    .where(eq(schema.document.documentId, documentName));

                return document[0]?.data;
            },
            store: async ({ documentName, state }) => {
                await db
                    .update(schema.document)
                    .set({
                        data: state,
                    })
                    .where(eq(schema.document.documentId, documentName));
            },
        }),
    ],
});

server.listen().then();
