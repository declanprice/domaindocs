import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { CreateDomainDto } from './dto/create-domain.dto';

@Injectable()
export class DomainService {
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

  async createDomain(session: UserSession, dto: CreateDomainDto) {
    return this.prisma.domain.create({
      data: {
        domainId: v4(),
        name: dto.domainName,
        slug: dto.domainName.replace(/\s/g, '').toLowerCase(),
        domainUsers: {
          create: {
            userId: session.userId,
          },
        },
      },
    });
  }
}
