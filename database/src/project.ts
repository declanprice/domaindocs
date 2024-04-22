import {
  pgTable,
  uniqueIndex,
  text,
  index,
  foreignKey,
  primaryKey,
} from 'drizzle-orm/pg-core';
import {
  documentation,
  domain,
  person,
  subdomain,
  team,
  teamMember,
  technology,
} from './index';
import { relations } from 'drizzle-orm/relations';

export const project = pgTable(
  'project',
  {
    projectId: text('project_id').primaryKey().notNull(),
    name: text('name').notNull(),
    iconUri: text('icon_uri').default(
      'https://cdn-icons-png.freepik.com/256/12148/12148631.png',
    ),
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

export const projectContact = pgTable(
  'project_contact',
  {
    contactId: text('contact_id').primaryKey().notNull(),
    projectId: text('project_id')
      .notNull()
      .references(() => project.projectId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    personId: text('person_id')
      .notNull()
      .references(() => person.personId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      personIdIdx: index('project_contact_person_id_idx').on(table.personId),
      projectIdIdx: index('project_contact_project_id_idx').on(table.projectId),
      personIdProjectIdKey: uniqueIndex(
        'project_contact_person_id_project_id_key',
      ).on(table.projectId, table.personId),
    };
  },
);

export const projectResourceLink = pgTable(
  'project_resource_link',
  {
    linkId: text('link_id').primaryKey().notNull(),
    projectId: text('project_id')
      .notNull()
      .references(() => project.projectId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    title: text('title').notNull(),
    subTitle: text('sub_title').default('Goto Resource').notNull(),
    href: text('href').notNull(),
    iconUri: text('iconUri').default(
      'https://cdn1.vectorstock.com/i/1000x1000/25/25/resources-allocation-icon-on-white-vector-27442525.jpg',
    ),
  },
  (table) => {
    return {
      projectIdIdx: index('project_resource_link_project_id_idx').on(
        table.projectId,
      ),
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
  contacts: many(projectContact),
  resourceLinks: many(projectResourceLink),
  technologies: many(projectTechnology),
}));

export const projectContactRelations = relations(
  projectContact,
  ({ one, many }) => ({
    project: one(project, {
      fields: [projectContact.projectId],
      references: [project.projectId],
    }),
    person: one(person, {
      fields: [projectContact.personId],
      references: [person.personId],
    }),
  }),
);

export const projectResourceLinkRelations = relations(
  projectResourceLink,
  ({ one, many }) => ({
    project: one(project, {
      fields: [projectResourceLink.projectId],
      references: [project.projectId],
    }),
  }),
);

export const projectTechnologyRelations = relations(
  projectTechnology,
  ({ one, many }) => ({
    project: one(project, {
      fields: [projectTechnology.projectId],
      references: [project.projectId],
    }),
    technology: one(technology, {
      fields: [projectTechnology.technologyId],
      references: [technology.technologyId],
    }),
  }),
);
