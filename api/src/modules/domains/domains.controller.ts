import { DomainsService } from './domains.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    EditContactData,
    EditDomainContactData,
    EditDomainDescriptionData,
    EditDomainLinkData,
    SendDomainInviteData,
    SetupDomainData,
    UpdateDomainNameData,
} from '@domaindocs/types';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainsController {
    constructor(readonly domainService: DomainsService) {}

    @Get(':domainId')
    async getDomain(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.domainService.getDomain(session, domainId);
    }

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

    @Post(':domainId/description')
    async updateDescription(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: EditDomainDescriptionData,
    ) {
        return this.domainService.updateDescription(session, domainId, data);
    }

    @Post(':domainId/contacts')
    async addContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: EditContactData,
    ) {
        return this.domainService.addContact(session, domainId, data);
    }

    @Post(':domainId/contacts/:contactId')
    async updateContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('contactId') contactId: string,
        @Body() data: EditContactData,
    ) {
        return this.domainService.updateContact(session, domainId, contactId, data);
    }

    @Delete(':domainId/contacts/:contactId')
    async removeContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('contactId') contactId: string,
    ) {
        return this.domainService.removeContact(session, domainId, contactId);
    }

    @Post(':domainId/links')
    async addLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: EditDomainLinkData,
    ) {
        return this.domainService.addLink(session, domainId, data);
    }

    @Post(':domainId/links/:linkId')
    async updateLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('linkId') linkId: string,
        @Body() data: EditDomainLinkData,
    ) {
        return this.domainService.updateLink(session, domainId, linkId, data);
    }

    @Delete(':domainId/links/:linkId')
    async removeLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('linkId') linkId: string,
    ) {
        return this.domainService.removeLink(session, domainId, linkId);
    }
}
