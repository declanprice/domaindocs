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

const client = new PrismaClient();

client.$connect().then(async () => {
  console.log('SEED: clearing data');

  await client.project.deleteMany();

  await client.teamMember.deleteMany();
  await client.team.deleteMany();

  await client.subdomainResourceLink.deleteMany();
  await client.subdomainContact.deleteMany();
  await client.subdomain.deleteMany();

  await client.person.deleteMany();

  await client.domain.deleteMany();

  await client.user.deleteMany();

  await client.user.createMany({
    data: [declanUser(), natashaUser(), benUser()],
  });

  await client.domain.create({
    data: ros(),
  });

  await client.person.createMany({
    data: [declanPerson(), benPerson(), natashaPerson()],
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
