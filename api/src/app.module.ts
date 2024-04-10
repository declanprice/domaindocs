import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: 'http://localhost:3567',
      appInfo: {
        appName: 'Domaindocs',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:5173',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
