import { PeopleService } from './people.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    SearchPeopleParams,
    DetailedPerson,
    UpdatePersonContactDetailsData,
    UpdatePersonSkillsData,
    EditPersonRoleData,
} from '@domaindocs/types';

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

    @Post(':userId/roles')
    async createRole(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: EditPersonRoleData,
    ): Promise<DetailedPerson> {
        return this.peopleService.createRole(session, domainId, userId, data);
    }

    @Post(':userId/roles/:roleId')
    async updateRole(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Param('roleId') roleId: string,
        @Body() data: EditPersonRoleData,
    ): Promise<DetailedPerson> {
        return this.peopleService.updateRole(session, domainId, userId, roleId, data);
    }

    @Delete(':userId/roles/:roleId')
    async deleteRole(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Param('roleId') roleId: string,
    ): Promise<DetailedPerson> {
        return this.peopleService.deleteRole(session, domainId, userId, roleId);
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
