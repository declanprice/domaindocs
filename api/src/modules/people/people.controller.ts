import { PeopleService } from './people.service';
import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchPeopleParams, DetailedPerson } from '@domaindocs/lib';

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
        if (!domainId) {
            throw new BadRequestException('missing params (domainId)');
        }

        return this.peopleService.searchPeople(session, domainId, dto);
    }
}
