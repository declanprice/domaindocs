import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { documentation } from './documentation';

export const document = pgTable('document', {
    documentId: text('document_id').primaryKey(),
    name: text('name').notNull().default('New Document'),
});

export const documentRelations = relations(document, ({ one }) => ({
    documentation: one(documentation, {
        fields: [document.documentId],
        references: [documentation.documentId],
    }),
}));
