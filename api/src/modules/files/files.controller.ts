import { FilesService } from './files.service';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchFilesParams } from '@domaindocs/lib';

@Controller('domains/:domainId/files')
@UseGuards(AuthGuard)
export class FilesController {
    constructor(readonly filesService: FilesService) {}

    @Get('')
    async searchFiles(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchFilesParams,
    ) {
        return this.filesService.searchFiles(session, domainId, dto);
    }

    @Get(':fileId/signed-url')
    async getSignedUrl(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('fileId') fileId: string,
    ) {
        return this.filesService.getSignedUrl(session, domainId, fileId);
    }
}
