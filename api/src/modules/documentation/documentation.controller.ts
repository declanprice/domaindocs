import { DocumentationService } from './documentation.service';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains')
@UseGuards(AuthGuard)
export class DocumentationController {
  constructor(readonly documentationService: DocumentationService) {}

  @Post('')
  async search(@AuthSession() session: UserSession) {}
}
