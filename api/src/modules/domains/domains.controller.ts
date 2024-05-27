import { DomainsService } from './domains.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SendDomainInviteData, SetupDomainData, UpdateDomainNameData } from '@domaindocs/types';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainsController {
    constructor(readonly domainService: DomainsService) {}

    @Post('')
    async setupDomain(@AuthSession() session: UserSession, @Body() data: SetupDomainData) {
        return this.domainService.setupDomain(session, data);
    }

    @Get(':domainId/settings')
    async getSettings(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.domainService.getSettings(session, domainId);
    }

    @Post('/:domainId/send-invite')
    async sendInvite(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: SendDomainInviteData,
    ) {
        return this.domainService.sendInvite(session, domainId, data);
    }

    @Post('/:domainId/name')
    async updateName(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: UpdateDomainNameData,
    ) {
        return this.domainService.updateName(session, domainId, data);
    }

    @Delete('/:domainId')
    async delete(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.domainService.delete(session, domainId);
    }
}
