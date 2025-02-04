import { PeopleService } from './people.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    SearchPeopleParams,
    DetailedPerson,
    EditPersonRoleData,
    EditPersonSkillData,
    EditPersonContactData,
    SearchPerson,
} from '@domaindocs/types';
import { EditPersonAboutMeData } from '../../../../shared/types/src/person/edit-person-about-me-data';

@Controller('domains/:domainId/people')
@UseGuards(AuthGuard)
export class PeopleController {
    constructor(readonly peopleService: PeopleService) {}

    @Get('')
    async searchPeople(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() params: SearchPeopleParams,
    ) {
        return this.peopleService.searchPeople(session, domainId, params);
    }

    @Get(':userId')
    async getPerson(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
    ): Promise<DetailedPerson> {
        return this.peopleService.getPerson(session, domainId, userId);
    }

    @Post(':userId/skills')
    async createSkill(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: EditPersonSkillData,
    ): Promise<DetailedPerson> {
        return this.peopleService.createSkill(session, domainId, userId, data);
    }

    @Delete(':userId/skills/:skillId')
    async deleteSkill(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Param('skillId') skillId: string,
    ): Promise<DetailedPerson> {
        return this.peopleService.deleteSkill(session, domainId, userId, skillId);
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

    @Post(':userId/contacts')
    async createContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: EditPersonContactData,
    ): Promise<DetailedPerson> {
        return this.peopleService.createContact(session, domainId, userId, data);
    }

    @Post(':userId/contacts/:contactId')
    async updateContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Param('contactId') contactId: string,
        @Body() data: EditPersonContactData,
    ): Promise<DetailedPerson> {
        return this.peopleService.updateContact(session, domainId, userId, contactId, data);
    }

    @Delete(':userId/contacts/:contactId')
    async deleteContact(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Param('contactId') contactId: string,
    ): Promise<DetailedPerson> {
        return this.peopleService.deleteContact(session, domainId, userId, contactId);
    }

    @Post(':userId/about-me')
    async updateAboutMe(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('userId') userId: string,
        @Body() data: EditPersonAboutMeData,
    ): Promise<DetailedPerson> {
        return this.peopleService.updateAboutMe(session, domainId, userId, data);
    }
}
