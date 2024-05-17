import { customType, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { documentation } from './documentation';

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return 'bytea';
    },
});

export const document = pgTable('document', {
    documentId: text('document_id').primaryKey(),
    data: bytea('data').notNull(),
});

export const documentRelations = relations(document, ({ one }) => ({
    documentation: one(documentation, {
        fields: [document.documentId],
        references: [documentation.documentId],
    }),
}));
