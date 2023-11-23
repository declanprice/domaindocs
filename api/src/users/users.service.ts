import { Injectable } from '@nestjs/common';
import { InjectDatabase, Database, users } from '../database';
import { AuthenticatedClaims, AuthenticatedUser } from 'shared-lib';

@Injectable()
export class UsersService {
  constructor(@InjectDatabase() private readonly database: Database) {}

  async getUser(claims: AuthenticatedClaims): Promise<AuthenticatedUser> {
    const user = await this.database.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, claims['cognito:username']),
    });

    if (!user) {
      return this.createUser(claims);
    }

    return user;
  }

  async createUser(claims: AuthenticatedClaims): Promise<AuthenticatedUser> {
    const rows = await this.database
      .insert(users)
      .values({
        username: claims['cognito:username'],
        email: claims.email,
        firstName: claims['custom:signUpFirstName'],
        lastName: claims['custom:signUpLastName'],
      })
      .returning();

    return rows[0];
  }
}
