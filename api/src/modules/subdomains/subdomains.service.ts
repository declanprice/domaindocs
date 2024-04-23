import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import { v4 } from 'uuid';
import {
  AddSubdomainContactsDto,
  AddSubdomainResourceLinkDto,
  CreateSubdomainDto,
  SubdomainOverviewDto,
  UpdateSubdomainDescriptionDto,
  SubdomainSummaryDto,
  SubdomainResourceLinkDto,
  SubdomainContactDto,
  SubdomainDto,
} from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { count, eq } from 'drizzle-orm';
import {
  contact,
  project, resourceLink,
  subdomain,
  team,
  teamMember
} from '@domaindocs/database'

@Injectable()
export class SubdomainsService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async getSubdomainsByDomainId(
    session: UserSession,
    domainId: string,
  ): Promise<SubdomainDto[]> {
    return this.db.query.subdomain.findMany({
      where: eq(subdomain.domainId, domainId),
    });
  }

  async getById(session: UserSession, subdomainId: string): Promise<SubdomainDto> {
    const result = await this.db.query.subdomain.findFirst({
      where: eq(subdomain.subdomainId, subdomainId),
    });

    if (!result) throw new NotFoundException();

    return result;
  }

  async getOverviewById(
    session: UserSession,
    domainId: string,
    subdomainId: string,
  ) {
    const result = await this.db.query.subdomain.findFirst({
      where: eq(subdomain.subdomainId, subdomainId),
      with: {
        resourceLinks: true,
        contacts: {
          with: {
            person: {
              with: {
                user: true,
                teamMember: true,
              },
            },
          },
        },
      },
    });

    const [peopleCount, teamCount, projectCount] = await Promise.all([
      this.db
        .select({ count: count() })
        .from(teamMember)
        .leftJoin(team, eq(teamMember.teamId, team.teamId))
        .leftJoin(subdomain, eq(subdomain.subdomainId, team.subdomainId))
        .where(eq(subdomain.subdomainId, subdomainId)),
      this.db
        .select({ count: count() })
        .from(team)
        .where(eq(team.subdomainId, subdomainId)),
      this.db
        .select({ count: count() })
        .from(project)
        .leftJoin(team, eq(project.teamId, team.teamId))
        .leftJoin(subdomain, eq(subdomain.subdomainId, team.subdomainId))
        .where(eq(subdomain.subdomainId, subdomainId)),
    ]);

    return new SubdomainOverviewDto(
      result.name,
      new SubdomainSummaryDto(
        peopleCount[0].count,
        teamCount[0].count,
        projectCount[0].count,
        result.description,
      ),
      result.resourceLinks.map(
        (r) =>
          new SubdomainResourceLinkDto(
            r.linkId,
            r.title,
            r.subTitle,
            r.href,
            r.iconUri,
          ),
      ),
      result.contacts.map(
        (c) =>
          new SubdomainContactDto(
            c.person.personId,
            c.person.user.userId,
            c.person.user.firstName,
            c.person.user.lastName,
            c.person.user.iconUri,
            c.person.teamMember?.role,
          ),
      ),
    );
  }

  async createSubdomain(
    session: UserSession,
    domainId: string,
    dto: CreateSubdomainDto,
  ) {
    const result = await this.db
      .insert(subdomain)
      .values({
        domainId,
        subdomainId: createSlug(dto.subdomainName),
        name: dto.subdomainName,
      })
      .returning();

    return new SubdomainDto(
      result[0].subdomainId,
      result[0].domainId,
      result[0].name,
      result[0].description,
    );
  }

  async updateDescription(
    session: UserSession,
    subdomainId: string,
    dto: UpdateSubdomainDescriptionDto,
  ) {
    const result = await this.db
      .update(subdomain)
      .set({
        description: dto.description,
      })
      .where(eq(subdomain.subdomainId, subdomainId))
      .returning();

    return new SubdomainDto(
      result[0].subdomainId,
      result[0].domainId,
      result[0].name,
      result[0].description,
    );
  }

  async addContacts(
    session: UserSession,
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainContactsDto,
  ) {
    await this.db.insert(contact).values(
      dto.personIds.map((personId) => ({
        contactId: v4(),
        subdomainId,
        personId,
      })),
    );
  }

  async addResourceLink(
    session: UserSession,
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainResourceLinkDto,
  ) {
    await this.db.insert(resourceLink).values({
      linkId: v4(),
      subdomainId,
      title: dto.title,
      subTitle: dto.subTitle,
      href: dto.href,
      iconUri: dto.iconUri,
    });
  }
}
