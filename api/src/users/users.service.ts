import { Injectable } from '@nestjs/common';
import { AuthenticatedClaims, AuthenticatedUser } from 'shared-lib';
import { PrismaService } from '../global';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(claims: AuthenticatedClaims): Promise<AuthenticatedUser> {
    const user = await this.prisma.users.findFirst({
      where: {
        username: claims['cognito:username'],
      },
    });

    if (!user) {
      return this.createUser(claims);
    }

    return user;
  }

  async createUser(claims: AuthenticatedClaims): Promise<AuthenticatedUser> {
    return this.prisma.users.create({
      data: {
        username: claims['cognito:username'],
        email: claims.email,
        firstName: claims['custom:signUpFirstName'],
        lastName: claims['custom:signUpLastName'],
      },
    });
  }
}
