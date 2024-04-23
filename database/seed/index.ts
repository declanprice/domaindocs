import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from '../src';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson } from './people';
import { finance, supporting } from './subdomains';
import { teamKeplar, teamOrion } from './teams';
import { angularTech, nestJsTech, reactTech } from './technologies';
import { documentation } from './documentation';
import {
  deedSearchApi,
  deedSearchUi,
  lrArchiveApi,
  lrArchiveUi,
} from './projects';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';
import { file, resourceLink, secret } from '../src'
import { contact } from '../src'
import { files } from './files'
import { secrets } from './secrets'

const sql = postgres(process.env['DATABASE_URL'] as string, { max: 1 });

const db = drizzle(sql, { schema });

(async () => {
  /** CLEAR **/

  await db.delete(schema.secret);
  await db.delete(schema.file);

  await db.delete(resourceLink);
  await db.delete(contact);

  await db.delete(schema.documentation);

  await db.delete(schema.projectTechnology);
  await db.delete(schema.project);

  await db.delete(schema.teamMember);
  await db.delete(schema.team);

  await db.delete(schema.subdomain);

  await db.delete(schema.personSkill);
  await db.delete(schema.person);

  await db.delete(schema.skill);
  await db.delete(schema.technology);

  await db.delete(schema.domain);
  await db.delete(schema.user);

  /** INSERTS **/

  await db.insert(schema.user).values([declanUser(), benUser(), natashaUser()]);
  await db.insert(schema.domain).values(ros());

  await db
    .insert(schema.skill)
    .values([uiDevSkill(), apiDevSkill(), devOpsSkill()]);

  await db
    .insert(schema.technology)
    .values([reactTech(), angularTech(), nestJsTech()]);

  await db
    .insert(schema.person)
    .values([declanPerson(), benPerson(), natashaPerson()]);

  await db.insert(schema.personSkill).values([
    {
      personId: declanPerson().personId,
      skillId: uiDevSkill().skillId,
    },
    {
      personId: declanPerson().personId,
      skillId: apiDevSkill().skillId,
    },
    {
      personId: declanPerson().personId,
      skillId: devOpsSkill().skillId,
    },
    {
      personId: benPerson().personId,
      skillId: devOpsSkill().skillId,
    },
    {
      personId: natashaPerson().personId,
      skillId: apiDevSkill().skillId,
    },
  ]);

  await db.insert(schema.subdomain).values([supporting(), finance()]);
  await db.insert(schema.team).values([teamOrion(), teamKeplar()]);
  await db.insert(schema.teamMember).values([
    {
      teamId: teamOrion().teamId,
      personId: declanPerson().personId,
      role: 'Software Developer',
    },
    {
      personId: natashaPerson().personId,
      teamId: teamOrion().teamId,
      role: 'Project Manager',
    },
    {
      personId: benPerson().personId,
      teamId: teamKeplar().teamId,
      role: 'Software Developer',
    },
  ]);

  await db
    .insert(schema.project)
    .values([deedSearchApi(), deedSearchUi(), lrArchiveApi(), lrArchiveUi()]);

  await db
    .insert(schema.documentation)
    .values([
      ...documentation(ros().domainId, deedSearchApi().projectId),
      ...documentation(ros().domainId, deedSearchUi().projectId),
      ...documentation(ros().domainId, lrArchiveApi().projectId),
      ...documentation(ros().domainId, lrArchiveUi().projectId),
    ]);

  await db.insert(schema.projectTechnology).values([
    {
      projectId: deedSearchApi().projectId,
      technologyId: nestJsTech().technologyId,
    },
    {
      projectId: deedSearchUi().projectId,
      technologyId: reactTech().technologyId,
    },
    {
      projectId: lrArchiveApi().projectId,
      technologyId: nestJsTech().technologyId,
    },
    {
      projectId: lrArchiveUi().projectId,
      technologyId: angularTech().technologyId,
    },
  ]);

  await db.insert(file).values([
    ...files(ros().domainId, deedSearchUi().projectId),
    ...files(ros().domainId, deedSearchApi().projectId),
    ...files(ros().domainId, lrArchiveApi().projectId),
    ...files(ros().domainId, lrArchiveUi().projectId),
  ]);

  await db.insert(secret).values([
    ...secrets(ros().domainId, deedSearchUi().projectId),
    ...secrets(ros().domainId, deedSearchApi().projectId),
    ...secrets(ros().domainId, lrArchiveApi().projectId),
    ...secrets(ros().domainId, lrArchiveUi().projectId),
  ]);

  process.exit(0);
})();
