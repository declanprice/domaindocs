import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { UserInput } from './user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    readonly authService: AuthService,
    readonly prisma: PrismaService,
  ) {}

  async getUser(userId: string) {
    return this.prisma.users.findUnique({
      where: {
        userId,
      },
    });
  }

  async createUser(data: UserInput) {
    const authUser = await this.authService.getUser(data.userId);

    return this.prisma.users.create({
      data: {
        userId: data.userId,
        email: authUser.emails[0],
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }
}
