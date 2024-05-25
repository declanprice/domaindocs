import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { AuthService } from '../../auth/auth.service';
import { UserData, SetupUserData, UserDomainDto } from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        readonly authService: AuthService,
        readonly prisma: PrismaService,
    ) {}

    async getAuthUser(session: UserSession) {
        const result = await this.prisma.user.findFirst({
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

        return new UserData(
            result.userId,
            result.email,
            result.firstName,
            result.lastName,
            result.people.map((u) => new UserDomainDto(u.domain.domainId, u.domain.name)),
        );
    }

    async setupUser(session: UserSession, dto: SetupUserData) {
        const authUser = await this.authService.getUser(session.userId);

        const result = await this.prisma.user.create({
            data: {
                userId: session.userId,
                email: authUser.emails[0],
                firstName: dto.firstName,
                lastName: dto.lastName,
                fullName: `${dto.firstName} ${dto.lastName}`,
            },
        });

        const user = result[0];

        return new UserData(user.userId, user.email, user.firstName, user.lastName, []);
    }
}
