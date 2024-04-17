import { ProjectsService } from './projects.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
  DetailedProject,
  SearchProjects,
  CreateProject,
  UpdateProjectDescription,
} from '@domaindocs/lib';

@Controller('domains/:domainId/projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(readonly projectsService: ProjectsService) {}

  @Get('')
  async searchProjects(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Body() dto: SearchProjects,
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
    return this.projectsService.getProjectOverview(
      session,
      domainId,
      projectId,
    );
  }

  @Post('')
  async createProject(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Body() dto: CreateProject,
  ) {
    return this.projectsService.createProject(session, domainId, dto);
  }

  @Put(':projectId/description')
  async updateProjectDescription(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectDescription,
  ) {
    return this.projectsService.updateProjectDescription(
      session,
      domainId,
      projectId,
      dto,
    );
  }
}
