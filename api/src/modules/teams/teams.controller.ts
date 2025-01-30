import { TeamsService } from './teams.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    DetailedTeam,
    SearchTeamParams,
    CreateTeamData,
    EditTeamDescriptionData,
    AddTeamMemberData,
    EditTeamLinkData,
} from '@domaindocs/types';

@Controller('domains/:domainId/teams')
@UseGuards(AuthGuard)
export class TeamsController {
    constructor(readonly teamsService: TeamsService) {}

    @Get('')
    async searchTeams(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchTeamParams,
    ): Promise<DetailedTeam[]> {
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.teamsService.searchByDomain(session, domainId, dto);
    }

    @Post('')
    async createTeam(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateTeamData,
    ) {
        return this.teamsService.createTeam(session, domainId, data);
    }

    @Get(':teamId')
    async getTeam(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
    ) {
        return this.teamsService.getTeam(session, domainId, teamId);
    }

    @Delete(':teamId')
    async deleteTeam(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
    ) {
        return this.teamsService.removeTeam(session, domainId, teamId);
    }

    @Post(':teamId/description')
    async updateDescription(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Body() data: EditTeamDescriptionData,
    ) {
        return this.teamsService.updateDescription(session, domainId, teamId, data);
    }

    @Post(':teamId/members')
    async addMember(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Body() data: AddTeamMemberData,
    ) {
        return this.teamsService.addMember(session, domainId, teamId, data);
    }

    @Delete(':teamId/members/:userId')
    async removeMember(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Param('userId') userId: string,
    ) {
        return this.teamsService.removeMember(session, domainId, teamId, userId);
    }

    @Post(':teamId/links')
    async addLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Body() data: EditTeamLinkData,
    ) {
        return this.teamsService.addLink(session, domainId, teamId, data);
    }

    @Post(':teamId/links/:linkId')
    async updateLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Param('linkId') linkId: string,
        @Body() data: EditTeamLinkData,
    ) {
        return this.teamsService.updateLink(session, domainId, teamId, linkId, data);
    }

    @Delete(':teamId/links/:linkId')
    async removeLink(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Param('linkId') linkId: string,
    ) {
        return this.teamsService.removeLink(session, domainId, teamId, linkId);
    }
}
