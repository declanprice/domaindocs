import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Error as STError } from 'supertokens-node';

@Catch(STError)
export class AuthExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    response.status(401).json({
      statusCode: 401,
      data: null,
      error: {
        message: exception.message,
      },
    });
  }
}
