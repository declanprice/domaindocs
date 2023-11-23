import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthClaims } from '../global';
import { AuthenticatedClaims, AuthenticatedUser } from 'shared-lib';
import { UsersService } from './users.service';

@Controller('/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getUser(
    @AuthClaims() claims: AuthenticatedClaims,
  ): Promise<AuthenticatedUser> {
    return this.userService.getUser(claims);
  }
}
