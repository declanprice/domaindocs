import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from '../src';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson } from './people';
import { teamKeplar, teamOrion } from './teams';
import { documentation } from './documentation';
import { deedSearch, lrArchive } from './projects';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';
import { file } from '../src';
import { files } from './files';
import { projectLinks } from './project-links';
import { teamOrionOwnership } from './project-ownership';
import { document } from './document';

const sql = postgres(process.env['DATABASE_URL'] as string, { max: 1 });

const db = drizzle(sql, { schema });

(async () => {
    /** CLEAR **/

    await db.delete(schema.documentation);

    await db.delete(schema.document);
    await db.delete(schema.file);

    await db.delete(schema.projectLink);
    await db.delete(schema.projectOwnership);
    await db.delete(schema.project);

    await db.delete(schema.teamMember);
    await db.delete(schema.team);

    await db.delete(schema.personSkill);
    await db.delete(schema.person);

    await db.delete(schema.skill);

    await db.delete(schema.domain);
    await db.delete(schema.user);

    /** INSERTS **/

    await db.insert(schema.user).values([declanUser(), benUser(), natashaUser()]);
    await db.insert(schema.domain).values(ros());

    await db.insert(schema.skill).values([uiDevSkill(), apiDevSkill(), devOpsSkill()]);

    await db.insert(schema.person).values([declanPerson(), benPerson(), natashaPerson()]);

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

    await db.insert(schema.team).values([teamOrion(), teamKeplar()]);
    await db.insert(schema.teamMember).values([
        {
            teamId: teamOrion().teamId,
            personId: declanPerson().personId,
        },
        {
            personId: natashaPerson().personId,
            teamId: teamOrion().teamId,
        },
        {
            personId: benPerson().personId,
            teamId: teamKeplar().teamId,
        },
    ]);

    await db.insert(schema.project).values([deedSearch(), lrArchive()]);

    await db.insert(schema.projectLink).values(projectLinks(deedSearch().projectId));

    await db
        .insert(schema.projectOwnership)
        .values([teamOrionOwnership(deedSearch().projectId), teamOrionOwnership(lrArchive().projectId)]);

    await db
        .insert(file)
        .values([...files(ros().domainId, deedSearch().projectId), ...files(ros().domainId, lrArchive().projectId)]);

    await db.insert(schema.document).values(document());

    await db
        .insert(schema.documentation)
        .values([
            ...documentation(ros().domainId, deedSearch().projectId),
            ...documentation(ros().domainId, lrArchive().projectId),
        ]);

    process.exit(0);
})();
