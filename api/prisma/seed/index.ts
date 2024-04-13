import { PrismaClient } from '@prisma/client';
import { ben, declan, natasha } from './users';
import { ros } from './domain';
import { supporting } from './subdomains';

const client = new PrismaClient();

client.$connect().then(async () => {
  console.log('SEED: clearing data');

  await client.subdomain.deleteMany();
  await client.domainUserRole.deleteMany();
  await client.domainUser.deleteMany();
  await client.domain.deleteMany();
  await client.user.deleteMany();

  await client.user.createMany({
    data: [declan(), natasha(), ben()],
  });

  await client.domain.create({
    data: {
      ...ros(),
      domainUsers: {
        createMany: {
          data: [
            {
              userId: declan().userId,
            },
            {
              userId: natasha().userId,
            },
            {
              userId: ben().userId,
            },
          ],
        },
      },
      domainUserRoles: {
        createMany: {
          data: [
            {
              userId: declan().userId,
            },
            {
              userId: natasha().userId,
            },
            {
              userId: ben().userId,
            },
          ],
        },
      },
    },
  });

  await client.subdomain.create({
    data: supporting(),
  });

  console.log('SEED: complete');
});
