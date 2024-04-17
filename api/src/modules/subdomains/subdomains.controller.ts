import { SubdomainsService } from './subdomains.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
  AddSubdomainContactsDto,
  AddSubdomainResourceLinkDto,
  CreateSubdomainDto,
  UpdateSubdomainDescriptionDto,
} from '@domaindocs/lib';

@Controller('domains/:domainId/subdomains')
@UseGuards(AuthGuard)
export class SubdomainsController {
  constructor(readonly subdomainsService: SubdomainsService) {}

  @Get('')
  async querySubdomains(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
  ) {
    if (!domainId) {
      throw new BadRequestException({
        message: 'Invalid search request.',
      });
    }

    return this.subdomainsService.getSubdomainsByDomainId(session, domainId);
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
    @Param('domainId') domainId: string,
    @Param('subdomainId') subdomainId: string,
  ) {
    return this.subdomainsService.getOverviewById(
      session,
      domainId,
      subdomainId,
    );
  }

  @Post('')
  async createSubdomain(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Body() dto: CreateSubdomainDto,
  ) {
    return this.subdomainsService.createSubdomain(session, domainId, dto);
  }

  @Put(':subdomainId/description')
  async updateDescription(
    @AuthSession() session: UserSession,
    @Param('subdomainId') subdomainId: string,
    @Body() dto: UpdateSubdomainDescriptionDto,
  ) {
    return this.subdomainsService.updateDescription(session, subdomainId, dto);
  }

  @Put(':subdomainId/contacts')
  async addContact(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Param('subdomainId') subdomainId: string,
    @Body() dto: AddSubdomainContactsDto,
  ) {
    return this.subdomainsService.addContacts(
      session,
      domainId,
      subdomainId,
      dto,
    );
  }

  @Put(':subdomainId/resource-link')
  async addResourceLink(
    @AuthSession() session: UserSession,
    @Param('domainId') domainId: string,
    @Param('subdomainId') subdomainId: string,
    @Body() dto: AddSubdomainResourceLinkDto,
  ) {
    return this.subdomainsService.addResourceLink(
      session,
      domainId,
      subdomainId,
      dto,
    );
  }
}
