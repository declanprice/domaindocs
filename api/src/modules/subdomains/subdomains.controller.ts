import { SubdomainsService } from './subdomains.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { CreateSubdomainData, SearchSubdomainsParams } from '@domaindocs/types';

@Controller('domains/:domainId/subdomains')
@UseGuards(AuthGuard)
export class SubdomainsController {
    constructor(readonly subdomainsService: SubdomainsService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() params: SearchSubdomainsParams,
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

    @Delete(':subdomainId')
    async delete(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('subdomainId') subdomainId: string,
    ) {
        return this.subdomainsService.delete(session, domainId, subdomainId);
    }
}
