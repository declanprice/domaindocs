import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    AddProjectOwnershipData,
    CreateProjectData,
    DetailedProject,
    DocumentationType,
    Project,
    ProjectOverview,
    ProjectLink,
    SearchProjectsParams,
    UpdateProjectDescriptionData,
    ProjectPersonOwnership,
    ProjectTeamOwnership,
} from '@domaindocs/lib';
import { v4 } from 'uuid';
import { createSlug } from '../../util/create-slug';
import { AddProjectLinkData } from '../../../../lib/src/project/add-project-link-data';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { eq } from 'drizzle-orm';
import { documentation, project, projectLink, projectOwnership } from '@domaindocs/database';

@Injectable()
export class ProjectsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchProjects(
        session: UserSession,
        domainId: string,
        dto: SearchProjectsParams,
    ): Promise<DetailedProject[]> {
        const results = await this.db.query.project.findMany({
            where: eq(project.domainId, domainId),
            with: {
                ownership: {
                    with: {
                        person: {
                            with: {
                                user: true,
                            },
                        },
                        team: true,
                    },
                },
                links: true,
            },
        });

        return results.map(
            (result) =>
                new DetailedProject(
                    new Project(result.projectId, result.name),
                    result.ownership?.map((o) => {
                        if (o.person) {
                            return new ProjectPersonOwnership(
                                o.person.personId,
                                o.person.user.firstName,
                                o.person.user.lastName,
                                o.description,
                                o.person.user.iconUri,
                            );
                        }

                        if (o.team) {
                            return new ProjectTeamOwnership(o.team.teamId, o.team.name, o.team.iconUri);
                        }
                    }),
                ),
        );
    }

    async getProjectOverview(session: UserSession, domainId: string, projectId: string): Promise<ProjectOverview> {
        const result = await this.db.query.project.findFirst({
            where: eq(project.projectId, projectId),
            with: {
                ownership: {
                    with: {
                        person: {
                            with: {
                                user: true,
                            },
                        },
                        team: true,
                    },
                },
                links: true,
            },
        });

        if (!result) throw new NotFoundException();

        return new ProjectOverview(
            result.projectId,
            result.name,
            result.description,
            result.ownership?.map((o) => {
                if (o.person) {
                    return new ProjectPersonOwnership(
                        o.person.personId,
                        o.person.user.firstName,
                        o.person.user.lastName,
                        o.description,
                        o.person.user.iconUri,
                    );
                }

                if (o.team) {
                    return new ProjectTeamOwnership(o.team.teamId, o.team.name, o.team.iconUri);
                }
            }),
            result.links.map((r) => new ProjectLink(r.linkId, r.title, r.subTitle, r.href, r.iconUri)),
        );
    }

    async createProject(session: UserSession, domainId: string, dto: CreateProjectData): Promise<void> {
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
                name: dto.name,
            });
        });
    }

    async updateDescription(
        session: UserSession,
        domainId: string,
        projectId: string,
        dto: UpdateProjectDescriptionData,
    ) {
        await this.db
            .update(project)
            .set({
                description: dto.description,
            })
            .where(eq(project.projectId, projectId));
    }

    async addOwnership(session: UserSession, domainId: string, projectId: string, dto: AddProjectOwnershipData) {
        await this.db.insert(projectOwnership).values({
            ownershipId: v4(),
            projectId,
            personId: dto.personId,
            teamId: dto.teamId,
        });
    }

    async addLink(session: UserSession, domainId: string, projectId: string, dto: AddProjectLinkData) {
        await this.db.insert(projectLink).values({
            linkId: v4(),
            projectId,
            title: dto.title,
            subTitle: dto.subTitle,
            href: dto.href,
            iconUri: dto.iconUri,
        });
    }
}
