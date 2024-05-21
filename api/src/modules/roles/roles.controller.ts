import { RolesService } from './roles.service';
import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchRolesParams, Role, CreateSkillData, Skill, CreateRoleData } from '@domaindocs/lib';

@Controller('domains/:domainId/roles')
@UseGuards(AuthGuard)
export class RolesController {
    constructor(readonly rolesService: RolesService) {}

    @Get('')
    async search(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Query() dto: SearchRolesParams,
    ): Promise<Role[]> {
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.rolesService.search(session, domainId, dto);
    }

    @Post('')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateRoleData,
    ): Promise<Role> {
        return this.rolesService.create(session, domainId, data);
    }
}
