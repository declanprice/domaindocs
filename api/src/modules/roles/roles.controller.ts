import { RolesService } from './roles.service';
import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchRolesParams, Role } from '@domaindocs/lib';

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
}
