import { Injectable, NotFoundException } from '@nestjs/common';
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
    AddProjectLinkData,
} from '@domaindocs/lib';
import { v4 } from 'uuid';
import { createSlug } from '../../util/create-slug';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async searchProjects(
        session: UserSession,
        domainId: string,
        dto: SearchProjectsParams,
    ): Promise<DetailedProject[]> {
        const results = await this.prisma.project.findMany({
            where: {
                domainId: domainId,
            },
            include: {
                ownership: {
                    include: {
                        user: true,
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
                        if (o.user) {
                            return new ProjectPersonOwnership(
                                o.user.userId,
                                o.user.firstName,
                                o.user.lastName,
                                o.description,
                                o.user.iconUri,
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
        const result = await this.prisma.project.findFirstOrThrow({
            where: {
                projectId,
            },
            include: {
                ownership: {
                    include: {
                        user: true,
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
                if (o.user) {
                    return new ProjectPersonOwnership(
                        o.user.userId,
                        o.user.firstName,
                        o.user.lastName,
                        o.description,
                        o.user.iconUri,
                    );
                }

                if (o.team) {
                    return new ProjectTeamOwnership(o.team.teamId, o.team.name, o.description, o.team.iconUri);
                }
            }),
            result.links.map((r) => new ProjectLink(r.linkId, r.title, r.subTitle, r.href, r.iconUri)),
        );
    }

    async createProject(session: UserSession, domainId: string, dto: CreateProjectData): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const documentationId = v4();
            const projectId = createSlug(dto.name);

            await tx.documentation.create({
                data: {
                    documentationId,
                    name: dto.name,
                    domainId,
                    type: DocumentationType.FOLDER,
                    projectId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdByUserId: session.userId,
                },
            });

            await tx.project.create({
                data: {
                    projectId,
                    domainId,
                    name: dto.name,
                    description: '',
                },
            });
        });
    }

    async updateDescription(
        session: UserSession,
        domainId: string,
        projectId: string,
        dto: UpdateProjectDescriptionData,
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

    async addOwnership(session: UserSession, domainId: string, projectId: string, dto: AddProjectOwnershipData) {
        await this.prisma.projectOwnership.create({
            data: {
                ownershipId: v4(),
                projectId,
                userId: dto.userId,
                teamId: dto.teamId,
                domainId,
            },
        });
    }

    async addLink(session: UserSession, domainId: string, projectId: string, dto: AddProjectLinkData) {
        await this.prisma.projectLink.create({
            data: {
                linkId: v4(),
                projectId,
                title: dto.title,
                subTitle: dto.subTitle,
                href: dto.href,
                iconUri: dto.iconUri,
                domainId,
            },
        });
    }
}
