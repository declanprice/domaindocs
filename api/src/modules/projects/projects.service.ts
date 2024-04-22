import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
  AddProjectContacts,
  CreateProject,
  DetailedProject,
  DocumentationType,
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
import { AddProjectResourceLink } from '../../../../lib/src/project/add-project-resource-link';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { eq } from 'drizzle-orm';
import {
  documentation,
  project,
  projectContact,
  projectResourceLink,
} from '@domaindocs/database';

@Injectable()
export class ProjectsService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async searchProjects(
    session: UserSession,
    domainId: string,
    dto: SearchProjects,
  ): Promise<DetailedProject[]> {
    const result = await this.db.query.project.findMany({
      where: eq(project.domainId, domainId),
      with: {
        team: {
          with: {
            subdomain: true,
          },
        },
        technologies: {
          with: {
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
    const result = await this.db.query.project.findFirst({
      where: eq(project.projectId, projectId),
      with: {
        team: true,
        resourceLinks: true,
        technologies: {
          with: {
            technology: true,
          },
        },
        contacts: {
          with: {
            person: {
              with: {
                teamMember: true,
                user: true,
              },
            },
          },
        },
      },
    });

    if (!result) throw new NotFoundException();

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
            c.person.teamMember.role,
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
    await this.db.transaction(async (tx) => {
      const documentationId = v4();
      const projectId = createSlug(dto.name);

      await tx.insert(documentation).values({
        documentationId,
        name: dto.name,
        domainId,
        type: DocumentationType.FOLDER,
        projectId,
      });

      await tx.insert(project).values({
        projectId,
        domainId,
        teamId: dto.teamId,
        name: dto.name,
      });
    });
  }

  async updateDescription(
    session: UserSession,
    domainId: string,
    projectId: string,
    dto: UpdateProjectDescription,
  ) {
    await this.db
      .update(project)
      .set({
        description: dto.description,
      })
      .where(eq(project.projectId, projectId));
  }

  async addContacts(
    session: UserSession,
    domainId: string,
    projectId: string,
    dto: AddProjectContacts,
  ) {
    await this.db.insert(projectContact).values(
      dto.personIds.map((personId) => ({
        contactId: v4(),
        projectId,
        personId,
      })),
    );
  }

  async addResourceLink(
    session: UserSession,
    domainId: string,
    projectId: string,
    dto: AddProjectResourceLink,
  ) {
    await this.db.insert(projectResourceLink).values({
      linkId: v4(),
      projectId,
      title: dto.title,
      subTitle: dto.subTitle,
      href: dto.href,
      iconUri: dto.iconUri,
    });
  }
}
