import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { UserData, SetupUserData } from '@domaindocs/types';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(readonly userService: UsersService) {}

    @Get('auth')
    async authUser(@AuthSession() session: UserSession): Promise<UserData> {
        return this.userService.getAuthUser(session);
    }

    @Post('/setup')
    async createUser(@AuthSession() session: UserSession, @Body() dto: SetupUserData): Promise<UserData> {
        return this.userService.setupUser(session, dto);
    }
}
