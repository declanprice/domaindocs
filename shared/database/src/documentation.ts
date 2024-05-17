import { pgTable, text, index, foreignKey, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { domain } from './domain';
import { project } from './project';
import { file } from './file';
import { document } from './document';
import { person } from './person';

export const documentation = pgTable(
    'documentation',
    {
        documentationId: text('documentation_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        projectId: text('project_id').references(() => project.projectId),
        name: text('name').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow(),
        createdBy: text('created_by').references(() => person.personId),
        type: text('type').notNull(),
        parentId: text('parent_id'),
        fileId: text('file_id').references(() => file.fileId),
        documentId: text('document_id').references(() => document.documentId),
    },
    (table) => {
        return {
            domainIdIdx: index('documentation_domainId_idx').on(table.domainId),
            documentationParentIdFkey: foreignKey({
                columns: [table.parentId],
                foreignColumns: [table.documentationId],
                name: 'documentation_parent_id_fkey',
            })
                .onDelete('set null')
                .onUpdate('cascade'),
        };
    },
);

export const documentationRelations = relations(documentation, ({ one, many }) => ({
    domain: one(domain, {
        fields: [documentation.domainId],
        references: [domain.domainId],
    }),
    project: one(project, {
        fields: [documentation.projectId],
        references: [project.projectId],
    }),
    file: one(file, {
        fields: [documentation.fileId],
        references: [file.fileId],
    }),
    createdBy: one(person, {
        fields: [documentation.createdBy],
        references: [person.personId],
    }),
    document: one(document, {
        fields: [documentation.documentId],
        references: [document.documentId],
    }),
    parent: one(documentation, {
        fields: [documentation.parentId],
        references: [documentation.documentationId],
        relationName: 'child_documentation',
    }),
    children: many(documentation, { relationName: 'child_documentation' }),
}));
