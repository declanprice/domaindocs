import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { AuthService } from '../../auth/auth.service';
import { User, SetupUserData, UserDomain } from '@domaindocs/types';
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

        return new User(
            result.userId,
            result.email,
            result.firstName,
            result.lastName,
            result.people.map((u) => new UserDomain(u.domain.domainId, u.domain.name)),
        );
    }

    async setupUser(session: UserSession, data: SetupUserData) {
        const authUser = await this.authService.getUser(session.userId);

        const email = authUser.emails[0];

        const invites = await this.prisma.domainInvite.findMany({
            where: {
                email: email,
            },
            include: {
                domain: true,
            },
        });

        if (invites.length > 0) {
            await this.prisma.$transaction(async (tx) => {
                await tx.user.create({
                    data: {
                        userId: session.userId,
                        email: email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        fullName: `${data.firstName} ${data.lastName}`,
                    },
                });

                for (const invite of invites) {
                    await tx.person.create({
                        data: {
                            userId: session.userId,
                            domainId: invite.domainId,
                        },
                    });

                    await tx.domainInvite.delete({
                        where: {
                            domainId: invite.domainId,
                            email: invite.email,
                        },
                    });
                }
            });
        } else {
            await this.prisma.user.create({
                data: {
                    userId: session.userId,
                    email: email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    fullName: `${data.firstName} ${data.lastName}`,
                },
            });
        }

        const user = await this.prisma.user.findUniqueOrThrow({
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

        return new User(
            user.userId,
            user.email,
            user.firstName,
            user.lastName,
            user.people.map((p) => new UserDomain(p.domain.domainId, p.domain.name)),
        );
    }
}
