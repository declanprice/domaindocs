import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, Session } from '../../auth/auth-session';
import { SetupUserDto } from './dto/setup-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('auth')
  async authUser(@AuthSession() session: Session) {
    return this.userService.getAuthUser(session);
  }

  @Post('/setup')
  async createUser(@AuthSession() session: Session, @Body() dto: SetupUserDto) {
    return this.userService.setupUser(session, dto);
  }
}
