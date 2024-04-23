import { SecretsService } from './secrets.service';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchSecrets } from '@domaindocs/lib';

@Controller('domains/:domainId/secrets')
@UseGuards(AuthGuard)
export class SecretsController {
    constructor(readonly secretsService: SecretsService) {}

    @Get('')
    async searchSecrets(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchSecrets,
    ) {
        return this.secretsService.searchSecrets(session, domainId, dto);
    }
}
