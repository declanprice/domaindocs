import { PeopleService } from './people.service';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { SearchPeopleDto, DetailedPersonDto } from 'lib';

@Controller('domains/:domainId/people')
@UseGuards(AuthGuard)
export class PeopleController {
  constructor(readonly peopleService: PeopleService) {}

  @Get('')
  async searchUsers(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Query() dto: SearchPeopleDto,
  ): Promise<DetailedPersonDto[]> {
    if (!domainId) {
      throw new BadRequestException('missing params (domainId)');
    }

    if (dto.subdomainId) {
      return this.peopleService.searchPeopleBySubdomain(session, domainId, dto);
    }

    return this.peopleService.searchPeople(session, domainId, dto);
  }
}
