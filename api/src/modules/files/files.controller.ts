import { FileWithSignedUrl, GenerateFileSignedUrlData, User } from '@domaindocs/types';
import { FilesService } from './files.service';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

@Controller('domains/:domainId/files')
@UseGuards(AuthGuard)
export class FilesController {
    constructor(readonly filesService: FilesService) {}

    @Post('/')
    async generateUploadUrl(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: GenerateFileSignedUrlData,
    ): Promise<FileWithSignedUrl> {
        return this.filesService.generateUploadUrl(session, domainId, data);
    }

    @Post('/:fileId')
    async generateGetUrl(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('fileId') fileId: string,
    ): Promise<FileWithSignedUrl> {
        return this.filesService.generateGetUrl(session, domainId, fileId);
    }
}
