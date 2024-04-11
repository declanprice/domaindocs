import { SubdomainsService } from './subdomains.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
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

  @Post('')
  async createSubdomain(
    @AuthSession() session: UserSession,
    @Body() dto: CreateSubdomainDto,
  ) {
    return this.subdomainsService.createSubdomain(session, dto);
  }
}
