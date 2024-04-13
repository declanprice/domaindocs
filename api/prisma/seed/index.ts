import { PrismaClient } from '@prisma/client';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { supporting } from './subdomains';
import { benRole, declanRole, natashaRole } from './roles';
import { benPerson, declanPerson, natashaPerson } from './people';

const client = new PrismaClient();

client.$connect().then(async () => {
  console.log('SEED: clearing data');

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

  console.log('SEED: complete');
});
