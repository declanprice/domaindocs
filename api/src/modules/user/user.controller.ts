import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SetupUserDto } from './dto/setup-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(readonly userService: UserService) {}

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
