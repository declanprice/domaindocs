import { Injectable } from '@nestjs/common';
import { Subdomain } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';

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

  // async createSubdomain(session: UserSession, dto: CreateSubdomainDto) {
  //   return this.prisma.domain.create({
  //     data: {
  //       domainId: v4(),
  //       name: dto.domainName,
  //       slug: dto.domainName.replace(/\s/g, '').toLowerCase(),
  //       domainUsers: {
  //         create: {
  //           userId: session.userId,
  //         },
  //       },
  //     },
  //   });
  // }
}
