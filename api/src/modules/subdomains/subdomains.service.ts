import { Injectable } from '@nestjs/common';
import { Subdomain } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { CreateSubdomainDto } from './dto/create-subdomain.dto';
import { createSlug } from '../../util/create-slug';
import { SubdomainOverviewDto } from './dto/subdomain-overview.dto';
import { SubdomainSummaryDto } from './dto/subdomain-summary.dto';
import { SubdomainResourceLinkDto } from './dto/subdomain-resource-link.dto';
import { SubdomainContactDto } from './dto/subdomain-contact.dto';

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

  async getOverviewById(session: UserSession, subdomainId: string) {
    const subdomain = await this.prisma.subdomain.findUniqueOrThrow({
      where: {
        subdomainId,
      },
    });

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
                domains: {
                  where: {
                    domainId: subdomain.domainId,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        _count: {
          select: {
            users: true,
            teams: true,
            projects: true,
          },
        },
      },
    });

    return new SubdomainOverviewDto(
      new SubdomainSummaryDto(
        result._count.users,
        result._count.teams,
        result._count.projects,
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
            c.user.domains[0].role,
            c.user.avatarUri,
          ),
      ),
    );
  }

  async createSubdomain(session: UserSession, dto: CreateSubdomainDto) {
    return this.prisma.subdomain.create({
      data: {
        domainId: dto.domainId,
        subdomainId: createSlug(dto.subdomainName),
        name: dto.subdomainName,
      },
    });
  }
}
