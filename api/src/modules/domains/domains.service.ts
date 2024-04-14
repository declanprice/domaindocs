import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { SetupDomainDto } from './dto/setup-domain.dto';
import { createSlug } from '../../util/create-slug';
import { v4 } from 'uuid';

@Injectable()
export class DomainsService {
  constructor(readonly prisma: PrismaService) {}

  async setupDomain(session: UserSession, dto: SetupDomainDto) {
    const personId = v4();
    const roleId = v4();

    return this.prisma.domain.create({
      data: {
        domainId: createSlug(dto.domainName),
        name: dto.domainName,
        people: {
          create: {
            personId,
            userId: session.userId,
          },
        },
      },
    });
  }
}
