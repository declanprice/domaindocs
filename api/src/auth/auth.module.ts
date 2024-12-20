import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { AuthModuleConfig, ConfigInjectionToken } from './auth.config';
import { AuthService } from './auth.service';
import { EmailService } from '../shared/services/email.service';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        EmailService,
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        AuthService,
      ],
      exports: [AuthService],
      imports: [],
      global: true,
      module: AuthModule,
    };
  }
}
