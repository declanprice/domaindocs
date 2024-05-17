import { SearchFilesParams } from '@domaindocs/lib';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains/:domainId/files')
@UseGuards(AuthGuard)
export class FilesController {
    constructor(readonly filesService: FilesService) {}

    @Get('')
    async searchFiles(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() params: SearchFilesParams,
    ) {
        return this.filesService.searchFiles(session, domainId, params);
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
