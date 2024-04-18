import { DocumentationService } from './documentation.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains/:domainId/documentation')
@UseGuards(AuthGuard)
export class DocumentationController {
  constructor(readonly documentationService: DocumentationService) {}

  @Get('')
  async search(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
  ) {
    return this.documentationService.search(session, domainId);
  }
}
