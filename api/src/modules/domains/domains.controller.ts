import { DomainsService } from './domains.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { SetupDomainDto } from './dto/setup-domain.dto';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains')
@UseGuards(AuthGuard)
export class DomainsController {
  constructor(readonly domainService: DomainsService) {}

  @Post('')
  async setupDomain(
    @AuthSession() session: UserSession,
    @Body() dto: SetupDomainDto,
  ) {
    return this.domainService.setupDomain(session, dto);
  }
}
