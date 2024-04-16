import { ProjectsService } from './projects.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
  DetailedProjectDto,
  SearchProjectsDto,
  CreateProjectDto,
} from '@domaindocs/lib';

@Controller('domains/:domainId/projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(readonly projectsService: ProjectsService) {}

  @Get('')
  async searchProjects(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Body() dto: SearchProjectsDto
  ): Promise<DetailedProjectDto[]> {
    if (!domainId) {
      throw new BadRequestException('missing params (domainId)');
    }

    return this.projectsService.searchProjects(session, domainId, dto);
  }

  @Post('')
  async createProject(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Body() dto: CreateProjectDto
  ) {
    return this.projectsService.createProject(session, domainId, dto);
  }
}
