import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getClaims } from '../get-claims';
import { PrismaService } from '../../prisma';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const claims = getClaims(request);

      const username = claims['cognito:username'];

      if (!username) {
        return false;
      }

      const user = await this.prisma.users.findFirst({
        where: { username },
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
