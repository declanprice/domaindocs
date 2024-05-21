import { SkillsService } from './skills.service';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { Skill, SearchSkillsParams, CreateSkillData } from '@domaindocs/lib';

@Controller('domains/:domainId/skills')
@UseGuards(AuthGuard)
export class SkillsController {
    constructor(readonly skillsService: SkillsService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() params: SearchSkillsParams,
    ): Promise<Skill[]> {
        return this.skillsService.search(session, domainId, params);
    }

    @Post('')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateSkillData,
    ): Promise<Skill> {
        return this.skillsService.create(session, domainId, data);
    }
}
