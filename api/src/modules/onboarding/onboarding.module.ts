import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [OnboardingController],
    providers: [OnboardingService, PrismaService],
})
export class OnboardingModule {}
