import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { getClaims } from '../get-claims';

import { AuthenticatedClaims } from 'shared-lib';

export const AuthUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.authUser) {
      throw new UnauthorizedException('no authenticated user found!');
    }

    return request.authUser;
  },
);
