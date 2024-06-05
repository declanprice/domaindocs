import { ComponentsService } from './components.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    SearchComponentsParams,
    CreateComponentData,
    EditComponentDescriptionData,
    EditComponentLinkData,
    SearchComponent,
    EditComponentOwnershipData,
    EditComponentSubdomainData,
    EditComponentContactData,
    EditComponentLabelData,
} from '@domaindocs/types';

@Controller('domains/:domainId/components')
@UseGuards(AuthGuard)
export class ComponentsController {
    constructor(readonly componentsService: ComponentsService) {}

    @Get('')
    async searchComponents(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchComponentsParams,
    ): Promise<SearchComponent[]> {
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.componentsService.searchComponents(session, domainId, dto);
    }

    @Get(':componentId')
    async getComponent(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
    ) {
        return this.componentsService.getComponent(session, domainId, componentId);
    }

    @Post('')
    async createComponent(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateComponentData,
    ) {
        return this.componentsService.createComponent(session, domainId, data);
    }

    @Post(':componentId/description')
    async updateDescription(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentDescriptionData,
    ) {
        return this.componentsService.updateDescription(session, domainId, componentId, data);
    }

    @Post(':componentId/ownership')
    async addOwnership(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentOwnershipData,
    ) {
        return this.componentsService.updateOwnership(session, domainId, componentId, data);
    }

    @Delete(':componentId/ownership')
    async removeOwnership(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
    ) {
        return this.componentsService.removeOwnership(session, domainId, componentId);
    }

    @Post(':componentId/subdomain')
    async addSubdomain(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentSubdomainData,
    ) {
        return this.componentsService.updateSubdomain(session, domainId, componentId, data);
    }

    @Delete(':componentId/subdomain')
    async removeSubdomain(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
    ) {
        return this.componentsService.removeSubdomain(session, domainId, componentId);
    }

    @Post(':componentId/links')
    async createLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentLinkData,
    ) {
        return this.componentsService.createLink(session, domainId, componentId, data);
    }

    @Post(':componentId/links/:linkId')
    async updateLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Param('linkId') linkId: string,
        @Body() data: EditComponentLinkData,
    ) {
        return this.componentsService.updateLink(session, domainId, componentId, linkId, data);
    }

    @Delete(':componentId/links/:linkId')
    async removeLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Param('linkId') linkId: string,
    ) {
        return this.componentsService.removeLink(session, domainId, componentId, linkId);
    }

    @Post(':componentId/links')
    async createContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentContactData,
    ) {
        return this.componentsService.createContact(session, domainId, componentId, data);
    }

    @Post(':componentId/contacts/:contactId')
    async updateContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Param('contactId') contactId: string,
        @Body() data: EditComponentContactData,
    ) {
        return this.componentsService.updateContact(session, domainId, componentId, contactId, data);
    }

    @Delete(':componentId/contacts/:contactId')
    async removeContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Param('contactId') contactId: string,
    ) {
        return this.componentsService.removeContact(session, domainId, componentId, contactId);
    }

    @Post(':componentId/labels')
    async addLabel(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Body() data: EditComponentLabelData,
    ) {
        return this.componentsService.addLabel(session, domainId, componentId, data);
    }

    @Delete(':componentId/labels/:labelId')
    async removeLabel(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('componentId') componentId: string,
        @Param('labelId') labelId: string,
    ) {
        return this.componentsService.removeLabel(session, domainId, componentId, labelId);
    }
}
