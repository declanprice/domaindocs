import { OnboardingService } from './onboarding.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { CreateEditOnboardingGuideData, UpdateOnboardingProgressData } from '@domaindocs/lib';

@Controller('domains/:domainId/onboarding')
@UseGuards(AuthGuard)
export class OnboardingController {
    constructor(readonly onboardingService: OnboardingService) {}

    @Get('')
    async search(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.onboardingService.search(session, domainId);
    }

    @Post('/')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateEditOnboardingGuideData,
    ) {
        return this.onboardingService.create(session, domainId, data);
    }

    @Get('/recommended')
    async getRecommended(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.onboardingService.getRecommended(session, domainId);
    }

    @Get('/:guideId')
    async get(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('guideId') guideId: string,
    ) {
        return this.onboardingService.get(session, domainId, guideId);
    }

    @Post('/:guideId/progress')
    async updateProgress(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('guideId') guideId: string,
        @Body() data: UpdateOnboardingProgressData,
    ) {
        return this.onboardingService.updateProgress(session, domainId, guideId, data);
    }
}
