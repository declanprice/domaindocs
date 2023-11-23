import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedUser, SelectableOrganisation } from 'shared-lib';
import { AuthGuard, AuthUser } from '../global';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';

@Controller('/organisations')
@UseGuards(AuthGuard)
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Get('/selectable')
  async getSelectable(
    @AuthUser() user: AuthenticatedUser,
  ): Promise<SelectableOrganisation[]> {
    return this.organisationsService.getSelectable(user);
  }

  @Post('/')
  async createOrganisation(
    @AuthUser() user: AuthenticatedUser,
    @Body() dto: CreateOrganisationDto,
  ): Promise<any> {
    return this.organisationsService.createOrganisation(user, dto);
  }
}
