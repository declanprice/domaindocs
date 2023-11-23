import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const AuthClaims = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.authClaims) {
      throw new UnauthorizedException('no authenticated claims found!');
    }

    return request.authClaims;
  },
);
