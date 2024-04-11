import { Injectable } from '@nestjs/common';
import { Subdomain } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { CreateSubdomainDto } from './dto/create-subdomain.dto';
import { createSlug } from '../../util/create-slug';

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

  async getSubdomainById(
    session: UserSession,
    subdomainId: string,
  ): Promise<Subdomain> {
    return this.prisma.subdomain.findUniqueOrThrow({
      where: {
        subdomainId,
      },
    });
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
