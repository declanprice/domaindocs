import {
  pgTable,
  uniqueIndex,
  text,
  index,
  foreignKey,
  primaryKey,
} from 'drizzle-orm/pg-core';
import {
  domain,
  person,
  project,
  subdomain,
  subdomainContact,
  subdomainResourceLink,
} from './index';
import { relations } from 'drizzle-orm/relations';

export const team = pgTable(
  'team',
  {
    teamId: text('team_id').primaryKey().notNull(),
    name: text('name').notNull(),
    iconUri: text('icon_uri').default(
      'https://cdn-icons-png.flaticon.com/512/1369/1369288.png',
    ),
    domainId: text('domain_id')
      .notNull()
      .references(() => domain.domainId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    subdomainId: text('subdomain_id')
      .notNull()
      .references(() => subdomain.subdomainId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      domainIdIdx: index('team_domain_id_idx').on(table.domainId),
    };
  },
);

export const teamMember = pgTable(
  'team_member',
  {
    teamId: text('team_id')
      .notNull()
      .references(() => team.teamId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    personId: text('person_id')
      .notNull()
      .references(() => person.personId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    role: text('role').default('Team Member').notNull(),
  },
  (table) => {
    return {
      personIdKey: uniqueIndex('team_member_personId_key').on(table.personId),
      teamIdIdx: index('team_member_teamId_idx').on(table.teamId),
      teamMemberPkey: primaryKey({
        columns: [table.teamId, table.personId],
        name: 'team_member_pkey',
      }),
    };
  },
);

export const teamRelations = relations(team, ({ one, many }) => ({
  subdomain: one(subdomain, {
    fields: [team.subdomainId],
    references: [subdomain.subdomainId],
  }),
  members: many(teamMember),
  projects: many(project),
}));

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.teamId],
  }),
  person: one(person, {
    fields: [teamMember.personId],
    references: [person.personId],
  }),
}));
