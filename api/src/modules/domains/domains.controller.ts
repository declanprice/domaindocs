import { DomainsService } from './domains.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SetupDomainData } from '@domaindocs/types';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainsController {
    constructor(readonly domainService: DomainsService) {}

    @Post('')
    async setupDomain(@AuthSession() session: UserSession, @Body() dto: SetupDomainData) {
        return this.domainService.setupDomain(session, dto);
    }
}
