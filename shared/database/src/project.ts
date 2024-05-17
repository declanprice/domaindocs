import { pgTable, text, index, foreignKey } from 'drizzle-orm/pg-core';
import { documentation, domain, documentationFile, person, team } from './index';
import { relations } from 'drizzle-orm/relations';

export const project = pgTable(
    'project',
    {
        projectId: text('project_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        name: text('name').notNull(),
        iconUri: text('icon_uri').default('https://cdn-icons-png.freepik.com/256/12148/12148631.png'),
        description: text('description').default('').notNull(),
    },
    (table) => {
        return {
            domainIdIdx: index('project_domain_id_idx').on(table.domainId),
        };
    },
);

export const projectLink = pgTable(
    'project_link',
    {
        linkId: text('link_id').primaryKey().notNull(),
        projectId: text('project_id').references(() => project.projectId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        title: text('title').notNull(),
        subTitle: text('sub_title').default('Go').notNull(),
        href: text('href').notNull(),
        iconUri: text('icon_uri').default(
            'https://cdn1.vectorstock.com/i/1000x1000/25/25/resources-allocation-icon-on-white-vector-27442525.jpg',
        ),
    },
    (table) => {
        return {
            domainIdIdx: index('project_link_domain_id_idx').on(table.domainId),
            projectIndex: index('project_link_project_index').on(table.projectId),
        };
    },
);

export const projectOwnership = pgTable(
    'project_ownership',
    {
        ownershipId: text('ownership_id').primaryKey().notNull(),
        projectId: text('project_id')
            .notNull()
            .references(() => project.projectId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        teamId: text('team_id').references(() => team.teamId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
        userId: text('user_id'),
        description: text('description').default('Full Project').notNull(),
    },
    (table) => {
        return {
            domainIdIdx: index('project_ownership_domain_id_idx').on(table.domainId),
            personFkey: foreignKey({
                columns: [table.userId, table.domainId],
                foreignColumns: [person.userId, person.domainId],
                name: 'project_ownership_person_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
        };
    },
);

/**
 *  Relations
 * **/
export const projectRelations = relations(project, ({ one, many }) => ({
    domain: one(domain, {
        fields: [project.domainId],
        references: [domain.domainId],
    }),
    documentation: one(documentation, {
        fields: [project.projectId],
        references: [documentation.documentationId],
    }),
    ownership: many(projectOwnership),
    links: many(projectLink),
    files: many(documentationFile),
}));

export const projectLinkRelations = relations(projectLink, ({ one }) => ({
    project: one(project, {
        fields: [projectLink.projectId],
        references: [project.projectId],
    }),
}));

export const projectOwnershipRelations = relations(projectOwnership, ({ one }) => ({
    project: one(project, {
        fields: [projectOwnership.projectId],
        references: [project.projectId],
    }),
    person: one(person, {
        fields: [projectOwnership.userId, projectOwnership.domainId],
        references: [person.userId, person.domainId],
    }),
    team: one(team, {
        fields: [projectOwnership.teamId],
        references: [team.teamId],
    }),
}));
