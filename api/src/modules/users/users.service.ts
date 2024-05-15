import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { AuthService } from '../../auth/auth.service';
import { UserData, SetupUserData, UserDomainDto } from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(
        readonly authService: AuthService,
        @Inject('DB') private db: PostgresJsDatabase<typeof schema>,
    ) {}

    async getAuthUser(session: UserSession) {
        const result = await this.db.query.user.findFirst({
            where: eq(schema.user.userId, session.userId),
            with: {
                people: {
                    with: {
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

        const result = await this.db
            .insert(schema.user)
            .values({
                userId: session.userId,
                email: authUser.emails[0],
                firstName: dto.firstName,
                lastName: dto.lastName,
                fullName: `${dto.firstName} ${dto.lastName}`,
            })
            .returning();

        const user = result[0];

        return new UserData(user.userId, user.email, user.firstName, user.lastName, []);
    }
}
