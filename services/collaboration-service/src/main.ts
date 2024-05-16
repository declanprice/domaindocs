import { Hocuspocus, onStoreDocumentPayload } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';

const server = new Hocuspocus({
    port: 5000,
});

let doc: any;

server.configure({
    extensions: [
        new Database({
            // Return a Promise to retrieve data …
            fetch: async ({ documentName }) => {
                return doc;
            },
            // … and a Promise to store data:
            store: async ({ documentName, state }) => {
                console.log('storing');
                doc = state;
            },
        }),
    ],
});

server.listen().then();
