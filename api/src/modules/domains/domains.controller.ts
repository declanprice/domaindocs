import { DomainsService } from './domains.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { SetupDomainDto } from './dto/setup-domain.dto';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainsController {
  constructor(readonly domainService: DomainsService) {}

  @Get('')
  async getDomains(@AuthSession() session: UserSession) {
    return this.domainService.getUserDomains(session);
  }

  @Post('')
  async setupDomain(
    @AuthSession() session: UserSession,
    @Body() dto: SetupDomainDto,
  ) {
    return this.domainService.setupDomain(session, dto);
  }
}
