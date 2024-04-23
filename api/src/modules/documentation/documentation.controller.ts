import { DocumentationService } from './documentation.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchDocumentation } from '@domaindocs/lib';
import { AddDocumentation } from '../../../../lib/src/documentation/add-documentation';

@Controller('domains/:domainId/documentation')
@UseGuards(AuthGuard)
export class DocumentationController {
    constructor(readonly documentationService: DocumentationService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchDocumentation,
    ) {
        return this.documentationService.search(session, domainId, dto);
    }

    @Post('/:documentationId/add')
    async addItem(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('documentationId') documentationId: string,
        @Body() dto: AddDocumentation,
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
