import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { documentation } from './documentation';
import { document } from './document';

export const embeddedResource = pgTable('embedded_resource', {
    embeddedResourceId: text('embedded_resource_id').primaryKey(),
    type: text('type').notNull(),
});

export const embeddedResourceRelations = relations(embeddedResource, ({ one }) => ({
    documentation: one(documentation, {
        fields: [embeddedResource.embeddedResourceId],
        references: [documentation.embeddedResourceId],
    }),
}));
