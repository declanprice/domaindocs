import { pgTable, text, index, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { domain } from './domain';
import { project } from './project';

export const documentation = pgTable(
    'documentation',
    {
        documentationId: text('documentation_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        name: text('name').notNull(),
        type: text('type').notNull(),
        parentId: text('parent_id'),
        projectId: text('project_id').references(() => project.projectId),
    },
    (table) => {
        return {
            domainIdIdx: index('documentation_domainId_idx').on(table.domainId),
            projectIdIdx: index('project_project_id_idx').on(table.projectId),
            documentationParentIdFkey: foreignKey({
                columns: [table.parentId],
                foreignColumns: [table.documentationId],
                name: 'documentation_parent_id_fkey',
            })
                .onUpdate('cascade')
                .onDelete('set null'),
        };
    },
);

export const documentationRelations = relations(documentation, ({ one, many }) => ({
    project: one(project, {
        fields: [documentation.projectId],
        references: [project.projectId],
    }),
    parent: one(documentation, {
        fields: [documentation.parentId],
        references: [documentation.documentationId],
        relationName: 'child_documentation',
    }),
    children: many(documentation, { relationName: 'child_documentation' }),
}));
