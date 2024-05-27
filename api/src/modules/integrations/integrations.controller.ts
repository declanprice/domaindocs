import { IntegrationsService } from './integrations.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SetupUserData } from '@domaindocs/types';

@Controller('integrations')
@UseGuards(AuthGuard)
export class IntegrationsController {
    constructor(readonly integrationsService: IntegrationsService) {}

    @Get('/')
    async search(@AuthSession() session: UserSession) {}

    @Post('/')
    async create(@AuthSession() session: UserSession, @Body() dto: SetupUserData) {}
}
