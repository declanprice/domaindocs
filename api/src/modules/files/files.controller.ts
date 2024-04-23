import { FilesService } from './files.service';
import {  Controller, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains/:domainId/files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(readonly filesService: FilesService) {}

  @Post('')
  async searchFiles(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string
  ) {
    return this.filesService.searchFiles(session, domainId);
  }
}
