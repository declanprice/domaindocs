import { ProjectsService } from './projects.service';
import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    DetailedProject,
    SearchProjectsParams,
    CreateProjectData,
    UpdateProjectDescriptionData,
    AddProjectOwnershipData,
    AddProjectLinkData,
} from '@domaindocs/lib';

@Controller('domains/:domainId/projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(readonly projectsService: ProjectsService) {}

    @Get('')
    async searchProjects(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchProjectsParams,
    ): Promise<DetailedProject[]> {
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.projectsService.searchProjects(session, domainId, dto);
    }

    @Get(':projectId/overview')
    async getProjectOverview(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('projectId') projectId: string,
    ) {
        return this.projectsService.getProjectOverview(session, domainId, projectId);
    }

    @Post('')
    async createProject(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() dto: CreateProjectData,
    ) {
        return this.projectsService.createProject(session, domainId, dto);
    }

    @Put(':projectId/description')
    async updateProjectDescription(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('projectId') projectId: string,
        @Body() dto: UpdateProjectDescriptionData,
    ) {
        return this.projectsService.updateDescription(session, domainId, projectId, dto);
    }

    @Put(':projectId/project-ownership')
    async addContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('projectId') projectId: string,
        @Body() dto: AddProjectOwnershipData,
    ) {
        return this.projectsService.addOwnership(session, domainId, projectId, dto);
    }

    @Put(':projectId/link')
    async addResourceLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('projectId') projectId: string,
        @Body() dto: AddProjectLinkData,
    ) {
        return this.projectsService.addLink(session, domainId, projectId, dto);
    }
}
