import { DocumentationService } from './documentation.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchDocumentation } from '@domaindocs/lib';

@Controller('domains/:domainId/documentation')
@UseGuards(AuthGuard)
export class DocumentationController {
  constructor(readonly documentationService: DocumentationService) {}

  @Get('')
  async search(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Query() dto: SearchDocumentation,
  ) {
    if (dto.relevant) {
      return this.documentationService.getRelevantToMe(session, domainId);
    }

    if (dto.projectId) {
      return this.documentationService.getProjectDocumentation(
        session,
        domainId,
        dto.projectId,
      );
    }

    return this.documentationService.search(session, domainId);
  }
}
