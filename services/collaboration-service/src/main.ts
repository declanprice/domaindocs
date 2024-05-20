import { Hocuspocus } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import { PrismaClient } from '@prisma/client';

const server = new Hocuspocus({
    port: 5000,
});

const client = new PrismaClient();

server.configure({
    extensions: [
        new Database({
            fetch: async ({ documentName }) => {
                const document = await client.documentationDocument.findFirst({
                    where: {
                        documentationId: documentName,
                    },
                });

                return document?.data;
            },
            store: async ({ documentName, state }) => {
                await client.documentationDocument.update({
                    where: {
                        documentationId: documentName,
                    },
                    data: {
                        data: state,
                    },
                });
            },
        }),
    ],
});

client.$connect().then((client) => {
    server.listen().then();
});
