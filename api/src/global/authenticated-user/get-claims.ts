import { jwtDecode } from 'jwt-decode';
import { AuthenticatedClaims } from 'shared-lib';

// AWS API GATEWAY handles the jwt validation with cognito before passing the claims into requestContext

export const getClaims = (request: any): AuthenticatedClaims => {
  let claims;

  // request.headers.authorization is only used for local development locally.
  if (!request?.requestContext && !request.headers.authorization) {
    throw Error(
      'authorization header or api gateway request context unavailable',
    );
  }

  if (request?.requestContext) {
    claims = request?.requestContext?.authorizer?.claims;
  } else {
    claims = JSON.parse(jwtDecode(request.headers.authorization));
  }

  return claims;
};
