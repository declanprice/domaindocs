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
import { AddSubdomainContactDto } from './dto/add-subdomain-contact.dto';

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
        subdomainResourceLinks: true,
        subdomainContacts: {
          include: {
            user: {
              include: {
                roles: {
                  where: {
                    domainId,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        _count: {
          select: {
            subdomainPeople: true,
            teamSubdomains: true,
            projectSubdomains: true,
          },
        },
      },
    });

    return new SubdomainOverviewDto(
      result.name,
      new SubdomainSummaryDto(
        result._count.subdomainPeople,
        result._count.teamSubdomains,
        result._count.projectSubdomains,
        result.description,
      ),
      result.subdomainResourceLinks.map(
        (r) =>
          new SubdomainResourceLinkDto(
            r.linkId,
            r.title,
            r.subTitle,
            r.href,
            r.iconUri,
          ),
      ),
      result.subdomainContacts.map(
        (c) =>
          new SubdomainContactDto(
            c.userId,
            c.user.firstName,
            c.user.lastName,
            c.user.iconUri,
            c.user.roles[0]?.name,
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

  async addContact(
    session: UserSession,
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainContactDto,
  ): Promise<SubdomainContactDto> {
    const result = await this.prisma.subdomainContact.create({
      data: {
        subdomainId,
        userId: dto.userId,
      },
      include: {
        user: {
          include: {
            roles: {
              where: {
                domainId,
              },
              take: 1,
            },
          },
        },
      },
    });

    return new SubdomainContactDto(
      result.userId,
      result.user.firstName,
      result.user.lastName,
      result.user.iconUri,
      result.user.roles[0]?.name,
    );
  }
}
