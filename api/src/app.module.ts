import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DomainsModule } from './modules/domains/domains.module';
import { SubdomainsModule } from './modules/subdomains/subdomains.module';
import { TeamsModule } from './modules/teams/teams.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PeopleModule } from './modules/people/people.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as schema from '@domaindocs/database';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: 'http://localhost:3567',
      appInfo: {
        appName: 'Domaindocs',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:4200',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
    DrizzlePostgresModule.register({
      tag: 'DB',
      postgres: {
        url: process.env.DATABASE_URL,
      },
      config: { schema, logger: true },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PeopleModule,
    DomainsModule,
    SubdomainsModule,
    TeamsModule,
    ProjectsModule,
    DocumentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
