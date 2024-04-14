import { Injectable } from '@nestjs/common';
import { Subdomain } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { UpdateSubdomainDescriptionDto } from './dto/update-subdomain-description.dto';
import { createSlug } from '../../util/create-slug';
import { SubdomainOverviewDto } from './dto/subdomain-overview.dto';
import { SubdomainSummaryDto } from './dto/subdomain-summary.dto';
import { SubdomainResourceLinkDto } from './dto/subdomain-resource-link.dto';
import { SubdomainContactDto } from './dto/subdomain-contact.dto';
import { CreateSubdomainDto } from './dto/create-subdomain.dto';
import { SubdomainDto } from './dto/subdomain.dto';
import { AddSubdomainContactsDto } from './dto/add-subdomain-contacts.dto';
import { v4 } from 'uuid';
import { AddSubdomainResourceLinkDto } from './dto/add-subdomain-resource-link.dto';

@Injectable()
export class SubdomainsService {
  constructor(readonly prisma: PrismaService) {}

  async getSubdomainsByDomainId(
    session: UserSession,
    domainId: string,
  ): Promise<Subdomain[]> {
    return this.prisma.subdomain.findMany({
      where: {
        domainId,
      },
    });
  }

  async getById(session: UserSession, subdomainId: string): Promise<Subdomain> {
    return this.prisma.subdomain.findUniqueOrThrow({
      where: {
        subdomainId,
      },
    });
  }

  async getOverviewById(
    session: UserSession,
    domainId: string,
    subdomainId: string,
  ) {
    const result = await this.prisma.subdomain.findUniqueOrThrow({
      where: {
        subdomainId,
      },
      include: {
        resourceLinks: true,
        contacts: {
          include: {
            person: {
              include: {
                user: true,
                teams: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    const [peopleCount, teamCount, projectCount] = await Promise.all([
      this.prisma.person.count({
        where: {
          teams: {
            some: {
              team: {
                subdomainId,
              },
            },
          },
        },
      }),
      this.prisma.team.count({
        where: {
          subdomainId,
        },
      }),
      this.prisma.project.count({
        where: {
          team: {
            subdomainId,
          },
        },
      }),
    ]);

    return new SubdomainOverviewDto(
      result.name,
      new SubdomainSummaryDto(
        peopleCount,
        teamCount,
        projectCount,
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
            c.person.teams[0]?.role,
          ),
      ),
    );
  }

  async createSubdomain(
    session: UserSession,
    domainId: string,
    dto: CreateSubdomainDto,
  ) {
    const result = await this.prisma.subdomain.create({
      data: {
        domainId,
        subdomainId: createSlug(dto.subdomainName),
        name: dto.subdomainName,
      },
    });

    return new SubdomainDto(
      result.subdomainId,
      result.domainId,
      result.name,
      result.description,
    );
  }

  async updateDescription(
    session: UserSession,
    subdomainId: string,
    dto: UpdateSubdomainDescriptionDto,
  ) {
    const result = await this.prisma.subdomain.update({
      where: {
        subdomainId,
      },
      data: {
        description: dto.description,
      },
    });

    return new SubdomainDto(
      result.subdomainId,
      result.domainId,
      result.name,
      result.description,
    );
  }

  async addContacts(
    session: UserSession,
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainContactsDto,
  ) {
    await this.prisma.subdomainContact.createMany({
      data: dto.personIds.map((personId) => ({
        contactId: v4(),
        subdomainId,
        personId,
      })),
    });
  }

  async addResourceLink(
    session: UserSession,
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainResourceLinkDto,
  ) {
    await this.prisma.subdomainResourceLink.create({
      data: {
        linkId: v4(),
        subdomainId,
        title: dto.title,
        subTitle: dto.subTitle,
        href: dto.href,
        iconUri: dto.iconUri,
      },
    });
  }
}
