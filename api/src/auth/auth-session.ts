import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionContainerInterface } from 'supertokens-node/lib/build/recipe/session/types';

export type Session = SessionContainerInterface;

export const AuthSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.session) {
      throw new UnauthorizedException('session does not exist');
    }

    return request.session;
  },
);
