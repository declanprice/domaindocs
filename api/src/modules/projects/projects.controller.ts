import { ProjectsService } from './projects.service';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(readonly projectsService: ProjectsService) {}
}
