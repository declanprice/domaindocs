import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { AuthService } from '../../auth/auth.service';
import { UserDto, SetupUserDto } from '@domaindocs/lib';

@Injectable()
export class UsersService {
  constructor(
    readonly authService: AuthService,
    readonly prisma: PrismaService
  ) {}

  async getAuthUser(session: UserSession) {
    const result = await this.prisma.user.findUnique({
      where: {
        userId: session.userId,
      },
      include: {
        people: {
          include: {
            domain: true,
          },
        },
      },
    });

    if (!result) return null;

    return new UserDto(
      result.userId,
      result.email,
      result.firstName,
      result.lastName,
      result.people.map((u) => u.domain)
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
        people: {
          include: {
            domain: true,
          },
        },
      },
    });

    return new UserDto(
      result.userId,
      result.email,
      result.firstName,
      result.lastName,
      result.people.map((u) => u.domain)
    );
  }
}
