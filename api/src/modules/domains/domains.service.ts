import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { SetupDomainDto } from './dto/setup-domain.dto';
import { createSlug } from '../../util/create-slug';

@Injectable()
export class DomainsService {
  constructor(readonly prisma: PrismaService) {}

  async getUserDomains(session: UserSession) {
    return this.prisma.domain.findMany({
      where: {
        domainUsers: {
          some: {
            userId: session.userId,
          },
        },
      },
    });
  }

  async setupDomain(session: UserSession, dto: SetupDomainDto) {
    return this.prisma.domain.create({
      data: {
        domainId: createSlug(dto.domainName),
        name: dto.domainName,
        domainUsers: {
          create: {
            userId: session.userId,
          },
        },
      },
    });
  }
}
