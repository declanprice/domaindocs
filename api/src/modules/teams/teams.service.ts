import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { QueryTeamDto } from './dto/query-team.dto';
import { v4 } from 'uuid';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(readonly prisma: PrismaService) {}

  async searchByDomain(
    session: UserSession,
    domainId: string,
    dto: QueryTeamDto,
  ) {
    const result = await this.prisma.team.findMany({
      where: {
        domainId,
      },
      include: {
        teamPeople: {
          include: {},
        },
      },
    });
  }

  async createTeam(session: UserSession, domainId: string, dto: CreateTeamDto) {
    await this.prisma.team.create({
      data: {
        teamId: v4(),
        domainId,
        name: dto.name,
      },
    });
  }
}
