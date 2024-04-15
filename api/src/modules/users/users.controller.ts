import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { UserDto, SetupUserDto } from 'lib';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Get('auth')
  async authUser(@AuthSession() session: UserSession): Promise<UserDto> {
    return this.userService.getAuthUser(session);
  }

  @Post('/setup')
  async createUser(
    @AuthSession() session: UserSession,
    @Body() dto: SetupUserDto,
  ): Promise<UserDto> {
    return this.userService.setupUser(session, dto);
  }
}
