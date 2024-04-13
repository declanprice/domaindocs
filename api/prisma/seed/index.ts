import { PrismaClient } from '@prisma/client';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { supporting } from './subdomains';
import { benRole, declanRole, natashaRole } from './roles';
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

  await client.projectSubdomain.deleteMany();
  await client.projectTeam.deleteMany();
  await client.projectPerson.deleteMany();
  await client.project.deleteMany();

  await client.teamSubdomain.deleteMany();
  await client.teamPerson.deleteMany();
  await client.team.deleteMany();

  await client.subdomainResourceLink.deleteMany();
  await client.subdomainContact.deleteMany();
  await client.subdomainPerson.deleteMany();
  await client.subdomain.deleteMany();

  await client.role.deleteMany();
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

  await client.role.createMany({
    data: [declanRole(), benRole(), natashaRole()],
  });

  await client.subdomain.create({
    data: supporting(),
  });

  await client.team.createMany({
    data: [teamOrion(), teamKeplar()],
  });

  await client.teamPerson.createMany({
    data: [
      {
        personId: declanPerson().personId,
        teamId: teamOrion().teamId,
        role: 'Team Member',
      },

      {
        personId: benPerson().personId,
        teamId: teamOrion().teamId,
        role: 'Team Member',
      },

      {
        personId: natashaPerson().personId,
        teamId: teamOrion().teamId,
      },
      {
        personId: declanPerson().personId,
        teamId: teamOrion().teamId,
      },

      {
        personId: benPerson().personId,
        teamId: teamOrion().teamId,
      },
      {
        personId: natashaPerson().personId,
        teamId: teamOrion().teamId,
      },
    ],
  });

  await client.projectTeam.createMany({
    data: [
      {
        projectId: deedSearchUi().projectId,
        teamId: teamOrion().teamId,
      },
      {
        projectId: deedSearchApi().projectId,
        teamId: teamOrion().teamId,
      },
      {
        projectId: lrArchiveUi().projectId,
        teamId: teamKeplar().teamId,
      },
      {
        projectId: lrArchiveApi().projectId,
        teamId: teamKeplar().teamId,
      },
    ],
  });

  console.log('SEED: complete');
});
