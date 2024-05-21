import { TeamsService } from './teams.service';
import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    DetailedTeam,
    SearchTeamParams,
    CreateTeamData,
    UpdateTeamSummaryData,
    UpdateTeamMembersData,
} from '@domaindocs/lib';

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

    @Post(':teamId/summary')
    async updateSummary(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Body() data: UpdateTeamSummaryData,
    ) {
        return this.teamsService.updateSummary(session, domainId, teamId, data);
    }

    @Post(':teamId/members')
    async updateMembers(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
        @Body() data: UpdateTeamMembersData,
    ) {
        return this.teamsService.updateMembers(session, domainId, teamId, data);
    }
}
