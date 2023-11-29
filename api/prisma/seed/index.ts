import process from 'process';
import { v4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const testUsername = 'a3718d47-1366-457a-8da5-1203f10598cd';

const createOrganisation = async (options: {
  rootUsername: string;
  orgsPerUser: number;
}) => {
  await prisma.users.create({
    data: {
      username: options.rootUsername,
      email: 'declanprice1@gmail.com',
      firstName: 'Declan',
      lastName: 'Price',
    },
  });

  for (let i = 0; i < options.orgsPerUser; i++) {
    const organisationId = v4();

    await prisma.organisations.create({
      data: {
        id: organisationId,
        name: `Test Organisation - ${i}`,
        summary: '',
      },
    });

    for (let j = 0; j < 3; j++) {
      await prisma.domains.create({
        data: {
          id: v4(),
          name: `Test Domain ${i}`,
          organisationId,
        },
      });
    }

    await prisma.people.create({
      data: {
        organisationId,
        username: options.rootUsername,
        contactNumber: '',
        contactEmail: '',
        contactLocation: '',
      },
    });
  }
};

const startSeed = async () => {
  await prisma.domains.deleteMany();
  await prisma.people.deleteMany();
  await prisma.organisations.deleteMany();
  await prisma.users.deleteMany();

  await createOrganisation({
    rootUsername: testUsername,
    orgsPerUser: 3,
  });

  for (let i = 0; i < 50; i++) {
    await createOrganisation({
      rootUsername: v4(),
      orgsPerUser: 3,
    });
  }
};

// @ts-ignore
await startSeed();

process.exit(0);
