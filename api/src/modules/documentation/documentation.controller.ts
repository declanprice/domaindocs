import { DocumentationService } from './documentation.service';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchDocumentationParams, AddDocumentationData } from '@domaindocs/types';

@Controller('domains/:domainId/documentation')
@UseGuards(AuthGuard)
export class DocumentationController {
    constructor(readonly documentationService: DocumentationService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchDocumentationParams,
    ) {
        return this.documentationService.search(session, domainId, dto);
    }

    @Get(':documentationId')
    async get(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('documentationId') documentationId: string,
    ) {
        return this.documentationService.get(session, domainId, documentationId);
    }

    @Get(':documentationId/signed-url')
    async getDocumentationFileSignedUrl(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('documentationId') documentationId: string,
    ) {
        return this.documentationService.getDocumentationFileSignedUrl(session, domainId, documentationId);
    }

    @Post('/:documentationId/add')
    async addItem(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('documentationId') documentationId: string,
        @Body() dto: AddDocumentationData,
    ) {
        return this.documentationService.add(session, domainId, documentationId, dto);
    }

    @Delete('/:documentationId')
    async removeItem(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('documentationId') documentationId: string,
    ) {
        return this.documentationService.remove(session, domainId, documentationId);
    }
}
