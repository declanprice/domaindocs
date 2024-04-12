import { SubdomainsService } from './subdomains.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { UpdateSubdomainDescriptionDto } from './dto/update-subdomain-description.dto';
import { CreateSubdomainDto } from './dto/create-subdomain.dto';

@Controller('subdomains')
@UseGuards(AuthGuard)
export class SubdomainsController {
  constructor(readonly subdomainsService: SubdomainsService) {}

  @Get('')
  async querySubdomains(
    @AuthSession() session: UserSession,
    @Query('domainId') domainId: string,
  ) {
    if (domainId) {
      return this.subdomainsService.getSubdomainsByDomainId(session, domainId);
    }

    throw new BadRequestException({
      message: 'Invalid search request.',
    });
  }

  @Get(':subdomainId')
  async getSubdomain(
    @AuthSession() session: UserSession,
    @Param('subdomainId') subdomainId: string,
  ) {
    return this.subdomainsService.getById(session, subdomainId);
  }

  @Get(':subdomainId/overview')
  async getSubdomainOverview(
    @AuthSession() session: UserSession,
    @Param('subdomainId') subdomainId: string,
  ) {
    return this.subdomainsService.getOverviewById(session, subdomainId);
  }

  @Post('')
  async createSubdomain(
    @AuthSession() session: UserSession,
    @Body() dto: CreateSubdomainDto,
  ) {
    return this.subdomainsService.createSubdomain(session, dto);
  }

  @Put(':subdomainId/description')
  async updateDescription(
    @AuthSession() session: UserSession,
    @Param('subdomainId') subdomainId: string,
    @Body() dto: UpdateSubdomainDescriptionDto,
  ) {
    return this.subdomainsService.updateDescription(session, subdomainId, dto);
  }
}
