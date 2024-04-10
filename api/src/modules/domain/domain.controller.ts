import { DomainService } from './domain.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateDomainDto } from './dto/create-domain.dto';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainController {
  constructor(readonly domainService: DomainService) {}

  @Get('')
  async getDomains(@AuthSession() session: UserSession) {
    return this.domainService.getUserDomains(session);
  }

  @Post('')
  async createDomain(
    @AuthSession() session: UserSession,
    @Body() dto: CreateDomainDto,
  ) {
    return this.domainService.createDomain(session, dto);
  }
}
