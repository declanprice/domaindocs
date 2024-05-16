import { pgTable, text, index } from 'drizzle-orm/pg-core';
import { documentation, domain, file, person, team } from './index';
import { relations } from 'drizzle-orm/relations';

export const project = pgTable(
    'project',
    {
        projectId: text('project_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        name: text('name').notNull(),
        iconUri: text('icon_uri').default('https://cdn-icons-png.freepik.com/256/12148/12148631.png'),
        description: text('description').default('').notNull(),
    },
    (table) => {
        return {
            domainIdIdx: index('project_domainId_idx').on(table.domainId),
        };
    },
);

export const projectOwnership = pgTable('project_ownership', {
    ownershipId: text('ownership_id').primaryKey().notNull(),
    projectId: text('project_id')
        .notNull()
        .references(() => project.projectId),
    teamId: text('team_id').references(() => team.teamId),
    personId: text('person_id').references(() => person.personId),
    description: text('description').default('Full Project').notNull(),
});

export const projectLink = pgTable(
    'project_link',
    {
        linkId: text('link_id').primaryKey().notNull(),
        projectId: text('project_id').references(() => project.projectId, {
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
            projectIndex: index('project_link_project_index').on(table.projectId),
        };
    },
);

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
    files: many(file),
}));

export const projectOwnershipRelations = relations(projectOwnership, ({ one }) => ({
    project: one(project, {
        fields: [projectOwnership.projectId],
        references: [project.projectId],
    }),
    person: one(person, {
        fields: [projectOwnership.personId],
        references: [person.personId],
    }),
    team: one(team, {
        fields: [projectOwnership.teamId],
        references: [team.teamId],
    }),
}));

export const projectLinkRelations = relations(projectLink, ({ one }) => ({
    project: one(project, {
        fields: [projectLink.projectId],
        references: [project.projectId],
    }),
}));
