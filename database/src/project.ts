import { pgTable, uniqueIndex, text, index, foreignKey, primaryKey } from 'drizzle-orm/pg-core';
import { documentation, domain, file, person, secret, subdomain, team, teamMember, technology } from './index'
import { relations } from 'drizzle-orm/relations';
import { contact } from './contact';
import { resourceLink } from './resource-link';

export const project = pgTable(
    'project',
    {
        projectId: text('project_id').primaryKey().notNull(),
        name: text('name').notNull(),
        iconUri: text('icon_uri').default('https://cdn-icons-png.freepik.com/256/12148/12148631.png'),
        description: text('description').default('').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        teamId: text('team_id')
            .notNull()
            .references(() => team.teamId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            domainIdIdx: index('project_domainId_idx').on(table.domainId),
        };
    },
);

export const projectTechnology = pgTable(
    'project_technology',
    {
        projectId: text('project_id')
            .notNull()
            .references(() => project.projectId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        technologyId: text('technology_id')
            .notNull()
            .references(() => technology.technologyId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            projectTechnologyPkey: primaryKey({
                columns: [table.projectId, table.technologyId],
                name: 'project_technology_pkey',
            }),
        };
    },
);

export const projectRelations = relations(project, ({ one, many }) => ({
    domain: one(domain, {
        fields: [project.domainId],
        references: [domain.domainId],
    }),
    team: one(team, {
        fields: [project.teamId],
        references: [team.teamId],
    }),
    documentation: one(documentation, {
        fields: [project.projectId],
        references: [documentation.projectId],
    }),
    contacts: many(contact),
    resourceLinks: many(resourceLink),
    technologies: many(projectTechnology),
    files: many(file),
    secrets: many(secret)
}));

export const projectTechnologyRelations = relations(projectTechnology, ({ one }) => ({
    project: one(project, { fields: [projectTechnology.projectId], references: [project.projectId] }),
    technology: one(technology, { fields: [projectTechnology.technologyId], references: [technology.technologyId] }),
}));
