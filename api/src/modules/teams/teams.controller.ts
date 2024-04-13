import { TeamsService } from './teams.service';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('domains/:domainId/teams')
@UseGuards(AuthGuard)
export class TeamsController {
  constructor(readonly teamsService: TeamsService) {}
}
