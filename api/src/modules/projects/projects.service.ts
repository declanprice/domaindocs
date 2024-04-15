import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import {
  CreateProjectDto,
  DetailedProjectDto,
  ProjectDto,
  ProjectSubdomainDto,
  ProjectTeamDto,
  ProjectTechnologyDto,
  SearchProjectsDto,
} from 'lib';
import { v4 } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(readonly prisma: PrismaService) {}

  async searchProjects(
    session: UserSession,
    domainId: string,
    dto: SearchProjectsDto,
  ): Promise<DetailedProjectDto[]> {
    const result = await this.prisma.project.findMany({
      where: {
        domainId,
      },
      include: {
        team: {
          include: {
            subdomain: true,
          },
        },
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    return result.map(
      (p) =>
        new DetailedProjectDto(
          new ProjectDto(p.projectId, p.name, p.teamId),
          new ProjectSubdomainDto(
            p.team.subdomain.subdomainId,
            p.team.subdomain.name,
          ),
          new ProjectTeamDto(p.team.teamId, p.team.name),
          p.technologies.map(
            (t) =>
              new ProjectTechnologyDto(
                t.technology.technologyId,
                t.technology.name,
              ),
          ),
        ),
    );
  }

  async createProject(
    session: UserSession,
    domainId: string,
    dto: CreateProjectDto,
  ): Promise<void> {
    await this.prisma.project.create({
      data: {
        projectId: v4(),
        domainId,
        teamId: dto.teamId,
        name: dto.name,
      },
    });
  }
}
