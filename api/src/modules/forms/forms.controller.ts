import { FormsService } from './forms.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SetupUserData } from '@domaindocs/types';

@Controller('forms')
@UseGuards(AuthGuard)
export class FormsController {
    constructor(readonly formsService: FormsService) {}

    @Get('/')
    async search(@AuthSession() session: UserSession) {}

    @Post('/')
    async create(@AuthSession() session: UserSession, @Body() dto: SetupUserData) {}
}
