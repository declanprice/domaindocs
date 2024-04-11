import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SetupUserDto } from './dto/setup-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Get('auth')
  async authUser(@AuthSession() session: UserSession): Promise<AuthUserDto> {
    return this.userService.getAuthUser(session);
  }

  @Post('/setup')
  async createUser(
    @AuthSession() session: UserSession,
    @Body() dto: SetupUserDto,
  ): Promise<AuthUserDto> {
    return this.userService.setupUser(session, dto);
  }
}
