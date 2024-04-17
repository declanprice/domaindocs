import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import {
  CreateProject,
  DetailedProject,
  Project,
  ProjectContact,
  ProjectOverview,
  ProjectOwnership,
  ProjectResourceLink,
  ProjectSubdomain,
  ProjectSummary,
  ProjectTeam,
  ProjectTechnology,
  SearchProjects,
  UpdateProjectDescription,
} from '@domaindocs/lib';
import { v4 } from 'uuid';
import { createSlug } from '../../util/create-slug';

@Injectable()
export class ProjectsService {
  constructor(readonly prisma: PrismaService) {}

  async searchProjects(
    session: UserSession,
    domainId: string,
    dto: SearchProjects,
  ): Promise<DetailedProject[]> {
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
        new DetailedProject(
          new Project(p.projectId, p.name, p.teamId),
          new ProjectSubdomain(
            p.team.subdomain.subdomainId,
            p.team.subdomain.name,
          ),
          new ProjectTeam(p.team.teamId, p.team.name),
          p.technologies.map(
            (t) =>
              new ProjectTechnology(
                t.technology.technologyId,
                t.technology.name,
              ),
          ),
        ),
    );
  }

  async getProjectOverview(
    session: UserSession,
    domainId: string,
    projectId: string,
  ): Promise<ProjectOverview> {
    const result = await this.prisma.project.findUniqueOrThrow({
      where: {
        projectId,
      },
      include: {
        team: true,
        resourceLinks: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        contacts: {
          include: {
            person: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return new ProjectOverview(
      new ProjectSummary(
        result.projectId,
        result.name,
        result.description,
        result.technologies.map(
          (t) => new ProjectTechnology(t.technologyId, t.technology.name),
        ),
      ),
      new ProjectOwnership(
        result.team.teamId,
        result.team.name,
        result.team.iconUri,
      ),
      result.contacts.map(
        (c) =>
          new ProjectContact(
            c.personId,
            c.person.userId,
            c.person.user.firstName,
            c.person.user.lastName,
            c.person.user.iconUri,
          ),
      ),
      result.resourceLinks.map(
        (r) =>
          new ProjectResourceLink(
            r.linkId,
            r.title,
            r.subTitle,
            r.href,
            r.iconUri,
          ),
      ),
    );
  }

  async createProject(
    session: UserSession,
    domainId: string,
    dto: CreateProject,
  ): Promise<void> {
    await this.prisma.project.create({
      data: {
        projectId: createSlug(dto.name),
        domainId,
        teamId: dto.teamId,
        name: dto.name,
      },
    });
  }

  async updateProjectDescription(
    session: UserSession,
    domainId: string,
    projectId: string,
    dto: UpdateProjectDescription,
  ) {
    await this.prisma.project.update({
      where: {
        projectId,
      },
      data: {
        description: dto.description,
      },
    });
  }
}
