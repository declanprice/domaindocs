import { OnboardingService } from './onboarding.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('domains/:domainId/onboarding')
@UseGuards(AuthGuard)
export class OnboardingController {
    constructor(readonly onboardingService: OnboardingService) {}

    @Get('')
    async search(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.onboardingService.search(session, domainId);
    }

    @Get('/recommended')
    async getRecommended(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.onboardingService.getRecommended(session, domainId);
    }
}
