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
                domainUsers: {
                  include: {
                    domainUserRole: true,
                  },
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
            subdomainUsers: true,
            teamSubdomains: true,
            projectSubdomains: true,
          },
        },
      },
    });

    return new SubdomainOverviewDto(
      result.name,
      new SubdomainSummaryDto(
        result._count.subdomainUsers,
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
            c.user.domainUsers[0].domainUserRole?.name,
            c.user.iconUri,
          ),
      ),
    );
  }

  async createSubdomain(session: UserSession, dto: CreateSubdomainDto) {
    const result = await this.prisma.subdomain.create({
      data: {
        domainId: dto.domainId,
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
}
