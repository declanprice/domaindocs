import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { SetupUserDto } from './dto/setup-user.dto';
import { AuthService } from '../../auth/auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    readonly authService: AuthService,
    readonly prisma: PrismaService,
  ) {}

  async searchUsers(session: UserSession, dto: SearchUsersDto) {
    const result = await this.prisma.user.findMany({
      where: {
        fullName: {
          contains: dto.name,
        },
      },
      include: {
        domainUsers: {
          where: {
            domainId: dto.domainId,
          },
          include: {
            domainUserRole: true,
          },
          take: 1,
        },
      },
    });

    return result.map(
      (user) =>
        new UserDto(
          user.userId,
          user.firstName,
          user.lastName,
          user.domainUsers[0]?.domainUserRole?.name,
          user.iconUri,
        ),
    );
  }

  async getAuthUser(session: UserSession) {
    const result = await this.prisma.user.findUnique({
      where: {
        userId: session.userId,
      },
      include: {
        domainUsers: {
          include: {
            domain: true,
          },
        },
      },
    });

    if (!result) return null;

    return new AuthUserDto(
      result.userId,
      result.email,
      result.firstName,
      result.lastName,
      result.domainUsers.map((u) => u.domain),
    );
  }

  async setupUser(session: UserSession, dto: SetupUserDto) {
    const authUser = await this.authService.getUser(session.userId);

    const result = await this.prisma.user.create({
      data: {
        userId: session.userId,
        email: authUser.emails[0],
        firstName: dto.firstName,
        lastName: dto.lastName,
        fullName: `${dto.firstName} ${dto.lastName}`,
      },
      include: {
        domainUsers: {
          include: {
            domain: true,
          },
        },
      },
    });

    return new AuthUserDto(
      result.userId,
      result.email,
      result.firstName,
      result.lastName,
      result.domainUsers.map((u) => u.domain),
    );
  }
}
