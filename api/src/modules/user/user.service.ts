import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { Session } from '../../auth/auth-session';
import { SetupUserDto } from './dto/setup-user.dto';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    readonly authService: AuthService,
    readonly prisma: PrismaService,
  ) {}

  async getAuthUser(session: Session) {
    return this.prisma.user.findUnique({
      where: {
        userId: session.getUserId(),
      },
    });
  }

  async setupUser(session: Session, dto: SetupUserDto) {
    const userId = session.getUserId();

    const authUser = await this.authService.getUser(userId);

    return this.prisma.user.create({
      data: {
        userId: userId,
        email: authUser.emails[0],
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
  }
}
