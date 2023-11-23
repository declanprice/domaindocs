import process from 'process';
import { v4 } from 'uuid';
import { users, people, organisations } from '../../src/database/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const db = drizzle(
  postgres('postgres://postgres:postgres@localhost:5432'),
);

const testUsername = 'a3718d47-1366-457a-8da5-1203f10598cd';

const createOrganisation = async (options: {
  rootUsername: string;
  orgsPerUser: number;
}) => {
  await db.insert(users).values([
    {
      username: options.rootUsername,
      email: 'declanprice1@gmail.com',
      firstName: 'Declan',
      lastName: 'Price',
    },
  ]);

  for (let i = 0; i < options.orgsPerUser; i++) {
    const organisationId = v4();

    await db.insert(organisations).values({
      id: organisationId,
      name: `Test Organisation - ${i}`,
      summary: '',
    });

    await db.insert(people).values({
      organisationId,
      username: options.rootUsername,
      contactNumber: '',
      contactEmail: '',
      contactLocation: '',
    });
  }
};

const startSeed = async () => {
  await db.delete(people);
  await db.delete(organisations);
  await db.delete(users);

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

(async () => {
  await startSeed();

  process.exit(0);
})();
