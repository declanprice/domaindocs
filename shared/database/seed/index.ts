import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from '../src';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson, personRoles, personSkills } from './people';
import { teamKeplar, teamMembers, teamOrion } from './teams';
import { documentation, documentationDocuments, documentationFiles } from './documentation';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';
import { softwareDevRole, teamLeadRole } from './roles';
import { deedSearchProject, projectLinks, projectOwnership } from './projects';

const sql = postgres(process.env['DATABASE_URL'] as string, { max: 1 });

const db = drizzle(sql, { schema });

(async () => {
    /** CLEAR **/

    await db.delete(schema.documentationFile);
    await db.delete(schema.documentationDocument);
    await db.delete(schema.documentation);

    await db.delete(schema.projectLink);
    await db.delete(schema.projectOwnership);
    await db.delete(schema.project);

    await db.delete(schema.teamMember);
    await db.delete(schema.team);

    await db.delete(schema.personSkill);
    await db.delete(schema.personRole);
    await db.delete(schema.person);

    await db.delete(schema.skill);
    await db.delete(schema.role);

    await db.delete(schema.domain);
    await db.delete(schema.user);

    /** INSERTS **/

    await db.insert(schema.user).values([declanUser(), benUser(), natashaUser()]);

    await db.insert(schema.domain).values(ros());

    await db.insert(schema.skill).values([uiDevSkill(), apiDevSkill(), devOpsSkill()]);

    await db.insert(schema.role).values([softwareDevRole(), teamLeadRole()]);

    await db.insert(schema.person).values([declanPerson(), benPerson(), natashaPerson()]);

    await db.insert(schema.personSkill).values(personSkills());

    await db.insert(schema.personRole).values(personRoles());

    await db.insert(schema.team).values([teamOrion(), teamKeplar()]);

    await db.insert(schema.teamMember).values(teamMembers());

    await db.insert(schema.project).values([deedSearchProject()]);

    await db.insert(schema.projectLink).values(projectLinks());

    await db.insert(schema.projectOwnership).values(projectOwnership());

    await db.insert(schema.documentationFile).values(documentationFiles());

    await db.insert(schema.documentationDocument).values(documentationDocuments());

    await db.insert(schema.documentation).values(documentation());

    process.exit(0);
})();
