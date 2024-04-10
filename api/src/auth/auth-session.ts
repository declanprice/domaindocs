import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export type UserSession = {
  userId: string;
};

export const AuthSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.session) {
      throw new UnauthorizedException('session does not exist');
    }

    return request.session;
  },
);
