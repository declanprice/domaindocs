import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { QueryTeamDto } from './dto/query-team.dto';
import { v4 } from 'uuid';
import { CreateTeamDto } from './dto/create-team.dto';
import {
  SubdomainTeamDto,
  TeamDto,
  TeamPersonDto,
  TeamProjectDto,
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
        subdomainTeams: {
          include: {
            subdomain: true,
          },
        },
        teamPeople: {
          include: {
            person: {
              include: {
                user: true,
              },
            },
          },
        },
        teamProjects: {
          include: {
            project: true,
          },
        },
      },
    });

    return result.map(
      (t) =>
        new TeamDto(
          t.teamId,
          t.name,
          t.subdomainTeams.map(
            (s) => new SubdomainTeamDto(s.subdomainId, s.subdomain.name),
          ),
          t.teamPeople.map(
            (p) =>
              new TeamPersonDto(
                p.personId,
                p.person.user.firstName,
                p.person.user.lastName,
                p.person.user.iconUri,
              ),
          ),
          t.teamProjects.map(
            (p) => new TeamProjectDto(p.projectId, p.project.name),
          ),
        ),
    );
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
