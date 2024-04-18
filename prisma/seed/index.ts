import { PrismaClient } from '@prisma/client';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { finance, supporting } from './subdomains';
import { benPerson, declanPerson, natashaPerson } from './people';
import { teamKeplar, teamOrion } from './teams';

import {
  deedSearchApi,
  deedSearchUi,
  lrArchiveApi,
  lrArchiveUi,
} from './projects';

import { uiDevSkill, devOpsSkill, apiDevSkill } from './skills';
import { angularTech, nestJsTech, reactTech } from './technologies';
import { documentation } from './documentation';

const client = new PrismaClient();

client.$connect().then(async () => {
  console.log('SEED: clearing data');

  /* CLEAR DATABASE */

  await client.projectDocumentation.deleteMany();
  await client.projectResourceLink.deleteMany();
  await client.projectContact.deleteMany();
  await client.projectTechnology.deleteMany();
  await client.project.deleteMany();

  await client.teamMember.deleteMany();
  await client.team.deleteMany();

  await client.subdomainResourceLink.deleteMany();
  await client.subdomainContact.deleteMany();
  await client.subdomain.deleteMany();

  await client.personSkill.deleteMany();
  await client.person.deleteMany();

  await client.skill.deleteMany();
  await client.technology.deleteMany();

  await client.domain.deleteMany();

  await client.user.deleteMany();

  /* START SEED */
  await client.user.createMany({
    data: [declanUser(), natashaUser(), benUser()],
  });

  await client.domain.create({
    data: ros(),
  });

  await client.skill.createMany({
    data: [uiDevSkill(), apiDevSkill(), devOpsSkill()],
  });

  await client.technology.createMany({
    data: [reactTech(), angularTech(), nestJsTech()],
  });

  await client.person.createMany({
    data: [declanPerson(), benPerson(), natashaPerson()],
  });

  await client.personSkill.createMany({
    data: [
      {
        personId: declanPerson().personId,
        skillId: uiDevSkill().skillId,
      },
      {
        personId: declanPerson().personId,
        skillId: apiDevSkill().skillId,
      },
      {
        personId: benPerson().personId,
        skillId: devOpsSkill().skillId,
      },
      {
        personId: natashaPerson().personId,
        skillId: apiDevSkill().skillId,
      },
    ],
  });

  await client.subdomain.createMany({
    data: [supporting(), finance()],
  });

  await client.team.createMany({
    data: [teamOrion(), teamKeplar()],
  });

  await client.teamMember.createMany({
    data: [
      {
        personId: declanPerson().personId,
        teamId: teamOrion().teamId,
        role: 'Team Lead',
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
    ],
  });

  await client.project.createMany({
    data: [deedSearchApi(), deedSearchUi(), lrArchiveApi(), lrArchiveUi()],
  });

  await client.projectDocumentation.createMany({
    data: [
      {
        projectId: deedSearchApi().projectId,
        documentation: JSON.stringify(documentation()),
      },
      {
        projectId: deedSearchUi().projectId,
        documentation: JSON.stringify(documentation()),
      },
      {
        projectId: lrArchiveApi().projectId,
        documentation: JSON.stringify(documentation()),
      },
      {
        projectId: lrArchiveUi().projectId,
        documentation: JSON.stringify(documentation()),
      },
    ],
  });

  await client.projectTechnology.createMany({
    data: [
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
    ],
  });

  console.log('SEED: complete');
});
