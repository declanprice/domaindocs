import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { EmailService } from './services/email.service'

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: 'http://localhost:3567',
      appInfo: {
        appName: 'Domaindocs',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:5173',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    GraphqlModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
