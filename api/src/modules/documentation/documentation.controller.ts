import { DocumentationService } from './documentation.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('documentation')
@UseGuards(AuthGuard)
export class DocumentationController {
  constructor(readonly documentationService: DocumentationService) {}

  @Get('')
  async search(@AuthSession() session: UserSession) {
    return this.documentationService.search(session);
  }
}
