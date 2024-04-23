import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    AddProjectContacts,
    CreateProject,
    DetailedPersonDto,
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
    contact,
    documentation,
    project,
    projectTechnology,
    resourceLink,
    subdomain,
    team,
    technology,
} from '@domaindocs/database';

@Injectable()
export class ProjectsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchProjects(session: UserSession, domainId: string, dto: SearchProjects): Promise<DetailedProject[]> {
        let where = eq(subdomain.domainId, domainId);

        if (dto.subdomainId) {
            where = eq(subdomain.subdomainId, dto.subdomainId);
        }

        const result = await this.db
            .select()
            .from(project)
            .leftJoin(team, eq(team.teamId, project.teamId))
            .leftJoin(subdomain, eq(subdomain.subdomainId, team.subdomainId))
            .leftJoin(projectTechnology, eq(projectTechnology.projectId, project.projectId))
            .leftJoin(technology, eq(technology.technologyId, projectTechnology.technologyId))
            .where(where);

        const dtos = result.reduce<Map<string, DetailedProject>>((acc, val) => {
            let dto = acc.get(val.project.projectId);

            if (!dto) {
                dto = new DetailedProject(
                    new Project(val.project.projectId, val.project.name, val.team.teamId),
                    new ProjectSubdomain(val.subdomain.subdomainId, val.subdomain.name),
                    new ProjectTeam(val.team.teamId, val.team.name),
                    [],
                );

                acc.set(val.project.projectId, dto);
            }

            if (val.technology) {
                dto.technologies.push(new ProjectTechnology(val.technology.technologyId, val.technology.name));
            }

            return acc;
        }, new Map());

        return Array.from(dtos.values());
    }

    async getProjectOverview(session: UserSession, domainId: string, projectId: string): Promise<ProjectOverview> {
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
                result.technologies.map((t) => new ProjectTechnology(t.technologyId, t.technology.name)),
            ),
            new ProjectOwnership(result.team.teamId, result.team.name, result.team.iconUri),
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
            result.resourceLinks.map((r) => new ProjectResourceLink(r.linkId, r.title, r.subTitle, r.href, r.iconUri)),
        );
    }

    async createProject(session: UserSession, domainId: string, dto: CreateProject): Promise<void> {
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

    async updateDescription(session: UserSession, domainId: string, projectId: string, dto: UpdateProjectDescription) {
        await this.db
            .update(project)
            .set({
                description: dto.description,
            })
            .where(eq(project.projectId, projectId));
    }

    async addContacts(session: UserSession, domainId: string, projectId: string, dto: AddProjectContacts) {
        await this.db.insert(contact).values(
            dto.personIds.map((personId) => ({
                contactId: v4(),
                projectId,
                personId,
            })),
        );
    }

    async addResourceLink(session: UserSession, domainId: string, projectId: string, dto: AddProjectResourceLink) {
        await this.db.insert(resourceLink).values({
            linkId: v4(),
            projectId,
            title: dto.title,
            subTitle: dto.subTitle,
            href: dto.href,
            iconUri: dto.iconUri,
        });
    }
}
