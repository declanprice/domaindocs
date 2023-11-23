import { Injectable } from '@nestjs/common';
import { InjectDatabase, Database, organisations, people } from '../database';
import { AuthenticatedUser, SelectableOrganisation } from 'shared-lib';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { v4 } from 'uuid';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrganisationsService {
  constructor(@InjectDatabase() private readonly database: Database) {}

  async getSelectable(
    user: AuthenticatedUser,
  ): Promise<SelectableOrganisation[]> {
    const rows = await this.database
      .select()
      .from(people)
      .where(eq(people.username, user.username))
      .leftJoin(organisations, eq(people.organisationId, organisations.id));

    return rows.map((r) => ({
      id: r.organisations.id,
      name: r.organisations.name,
    }));
  }

  async createOrganisation(
    user: AuthenticatedUser,
    dto: CreateOrganisationDto,
  ) {
    return this.database.transaction(async (tx) => {
      const orgId = v4();

      await tx.insert(organisations).values({
        id: orgId,
        name: dto.name,
        summary: '',
      });

      await tx.insert(people).values({
        organisationId: orgId,
        username: user.username,
        contactNumber: '',
        contactEmail: '',
        contactLocation: '',
      });
    });
  }
}
