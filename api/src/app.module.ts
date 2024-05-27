import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DomainsModule } from './modules/domains/domains.module';
import { TeamsModule } from './modules/teams/teams.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PeopleModule } from './modules/people/people.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { RolesModule } from './modules/roles/roles.module';
import { SkillsModule } from './modules/skills/skills.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { WorkAreasModule } from './modules/work-areas/work-areas.module';
import { FormsModule } from './modules/forms/forms.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';

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
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        PeopleModule,
        DomainsModule,
        TeamsModule,
        ProjectsModule,
        DocumentationModule,
        RolesModule,
        SkillsModule,
        OnboardingModule,
        WorkAreasModule,
        FormsModule,
        IntegrationsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
