import { SubdomainsService } from './subdomains.service';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    CreateSubdomainData,
    EditContactData,
    EditDescriptionData,
    EditLinkData,
    SearchSubdomainsParams,
    UpdateNameData,
} from '@domaindocs/types';

@Controller('domains/:domainId/subdomains')
@UseGuards(AuthGuard)
export class SubdomainsController {
    constructor(readonly subdomainsService: SubdomainsService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() params: SearchSubdomainsParams,
    ) {
        return this.subdomainsService.search(session, domainId, params);
    }

    @Post('/')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateSubdomainData,
    ) {
        return this.subdomainsService.create(session, domainId, data);
    }

    @Get(':subdomainId')
    async get(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
    ) {
        return this.subdomainsService.get(session, domainId, subdomainId);
    }

    @Post(':subdomainId/name')
    async updateName(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Body() data: UpdateNameData,
    ) {
        return this.subdomainsService.updateName(session, domainId, subdomainId, data);
    }

    @Post(':subdomainId/description')
    async updateDescription(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Body() data: EditDescriptionData,
    ) {
        return this.subdomainsService.updateDescription(session, domainId, subdomainId, data);
    }

    @Delete(':subdomainId')
    async delete(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
    ) {
        return this.subdomainsService.delete(session, domainId, subdomainId);
    }

    @Post(':subdomainId/contacts')
    async addContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Body() data: EditContactData,
    ) {
        return this.subdomainsService.addContact(session, domainId, subdomainId, data);
    }

    @Post(':subdomainId/contacts/:contactId')
    async updateContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Param('contactId') contactId: string,
        @Body() data: EditContactData,
    ) {
        return this.subdomainsService.updateContact(session, domainId, subdomainId, contactId, data);
    }

    @Delete(':subdomainId/contacts/:contactId')
    async removeContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Param('contactId') contactId: string,
    ) {
        return this.subdomainsService.removeContact(session, domainId, subdomainId, contactId);
    }

    @Post(':subdomainId/links')
    async addLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Body() data: EditLinkData,
    ) {
        return this.subdomainsService.addLink(session, domainId, subdomainId, data);
    }

    @Post(':subdomainId/links/:linkId')
    async updateLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Param('linkId') linkId: string,
        @Body() data: EditLinkData,
    ) {
        return this.subdomainsService.updateLink(session, domainId, subdomainId, linkId, data);
    }

    @Delete(':subdomainId/links/:linkId')
    async removeLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
        @Param('linkId') linkId: string,
    ) {
        return this.subdomainsService.removeLink(session, domainId, subdomainId, linkId);
    }
}
