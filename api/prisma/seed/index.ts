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
import { awsSkill, devOpsSkill, nodeJsSkill } from './skills';

const client = new PrismaClient();

client.$connect().then(async () => {
  console.log('SEED: clearing data');

  /* CLEAR DATABASE */
  await client.project.deleteMany();

  await client.teamMember.deleteMany();
  await client.team.deleteMany();

  await client.subdomainResourceLink.deleteMany();
  await client.subdomainContact.deleteMany();
  await client.subdomain.deleteMany();

  await client.personSkill.deleteMany();
  await client.person.deleteMany();

  await client.skill.deleteMany();

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
    data: [awsSkill(), nodeJsSkill(), devOpsSkill()],
  });

  await client.person.createMany({
    data: [declanPerson(), benPerson(), natashaPerson()],
  });

  await client.personSkill.createMany({
    data: [
      {
        personId: declanPerson().personId,
        skillId: awsSkill().skillId,
      },
      {
        personId: declanPerson().personId,
        skillId: nodeJsSkill().skillId,
      },
      {
        personId: benPerson().personId,
        skillId: devOpsSkill().skillId,
      },
      {
        personId: natashaPerson().personId,
        skillId: nodeJsSkill().skillId,
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

  console.log('SEED: complete');
});
