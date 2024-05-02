import { TeamsService } from './teams.service';
import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { DetailedTeam, SearchTeamParams, CreateTeamData } from '@domaindocs/lib';

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
        @Body() dto: CreateTeamData,
    ) {
        return this.teamsService.createTeam(session, domainId, dto);
    }

    @Get(':teamId')
    async getTeam(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('teamId') teamId: string,
    ) {
        return this.teamsService.getTeam(session, domainId, teamId);
    }
}
