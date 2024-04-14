import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { QueryTeamDto } from './dto/query-team.dto';
import { v4 } from 'uuid';
import { CreateTeamDto } from './dto/create-team.dto';
import {
  TeamDto,
  TeamMemberDto,
  TeamProjectDto,
  TeamSubdomainDto,
} from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(readonly prisma: PrismaService) {}

  async searchByDomain(
    session: UserSession,
    domainId: string,
    dto: QueryTeamDto,
  ): Promise<TeamDto[]> {
    const result = await this.prisma.team.findMany({
      where: {
        domainId,
      },
      include: {
        subdomain: true,
        members: {
          include: {
            person: {
              include: {
                user: true,
              },
            },
          },
        },
        projects: true,
      },
    });

    return result.map(
      (t) =>
        new TeamDto(
          t.teamId,
          t.name,
          new TeamSubdomainDto(t.subdomainId, t.subdomain.name),
          t.members.map(
            (p) =>
              new TeamMemberDto(
                p.personId,
                p.person.user.firstName,
                p.person.user.lastName,
                p.person.user.iconUri,
              ),
          ),
          t.projects.map((p) => new TeamProjectDto(p.projectId, p.name)),
        ),
    );
  }

  async createTeam(session: UserSession, domainId: string, dto: CreateTeamDto) {
    await this.prisma.team.create({
      data: {
        teamId: v4(),
        subdomainId: dto.subdomainId,
        domainId,
        name: dto.name,
      },
    });
  }
}
