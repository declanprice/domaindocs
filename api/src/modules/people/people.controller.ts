import { PeopleService } from './people.service';
import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    SearchPeopleParams,
    DetailedPerson,
    UpdatePersonRolesData,
    UpdatePersonContactDetailsData,
} from '@domaindocs/types';
import { UpdatePersonSkillsData } from '../../../../shared/types/src/person/update-person-skills-data';

@Controller('domains/:domainId/people')
@UseGuards(AuthGuard)
export class PeopleController {
    constructor(readonly peopleService: PeopleService) {}

    @Get('')
    async searchPeople(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchPeopleParams,
    ): Promise<DetailedPerson[]> {
        return this.peopleService.searchPeople(session, domainId, dto);
    }

    @Get(':userId')
    async getPerson(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
    ): Promise<DetailedPerson> {
        return this.peopleService.getPerson(session, domainId, userId);
    }

    @Put(':userId/skills')
    async updateSkills(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: UpdatePersonSkillsData,
    ): Promise<void> {
        return this.peopleService.updateSkills(session, domainId, userId, data);
    }

    @Put(':userId/roles')
    async updateRoles(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: UpdatePersonRolesData,
    ): Promise<void> {
        return this.peopleService.updateRoles(session, domainId, userId, data);
    }

    @Put(':userId/contact')
    async updateContactDetails(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: UpdatePersonContactDetailsData,
    ): Promise<void> {
        return this.peopleService.updateContactDetails(session, domainId, userId, data);
    }
}
