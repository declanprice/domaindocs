import { SkillsService } from './skills.service';
import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { Skill, SearchSkillsParams } from '@domaindocs/lib';

@Controller('domains/:domainId/skills')
@UseGuards(AuthGuard)
export class SkillsController {
    constructor(readonly skillsService: SkillsService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchSkillsParams,
    ): Promise<Skill[]> {
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.skillsService.searchSkills(session, domainId, dto);
    }
}
