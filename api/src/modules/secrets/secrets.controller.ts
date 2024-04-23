import { SecretsService } from './secrets.service';
import { Controller, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains/:domainId/secrets')
@UseGuards(AuthGuard)
export class SecretsController {
  constructor(readonly secretsService: SecretsService) {}

  @Post('')
  async searchSecrets(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string
  ) {
    return this.secretsService.searchSecrets(session, domainId);
  }
}
