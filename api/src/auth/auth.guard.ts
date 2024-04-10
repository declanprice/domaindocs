import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import Session from 'supertokens-node/recipe/session';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const http = ctx.switchToHttp();

    const request: any = http.getRequest<Request>();

    const response = http.getResponse();

    const session = await Session.getSession(request, response);

    request.session = {
      userId: session.getUserId(),
    };

    return true;
  }
}
