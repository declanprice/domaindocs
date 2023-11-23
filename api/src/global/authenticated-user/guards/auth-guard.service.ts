import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getClaims } from '../get-claims';
import { Database, InjectDatabase } from '../../../database';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectDatabase() private readonly database: Database) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const claims = getClaims(request);

      const username = claims['cognito:username'];

      if (!username) {
        return false;
      }

      const user = await this.database.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, username),
      });

      if (user) {
        request.authUser = user;
      }

      request.authClaims = claims;

      return true;
    } catch (error) {
      return false;
    }
  }
}
