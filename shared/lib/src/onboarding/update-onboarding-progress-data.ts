import { IsString } from 'class-validator';
import { OnboardingProgressStatus } from './onboarding-progress';

export class UpdateOnboardingProgressData {
    @IsString()
    status: OnboardingProgressStatus;

    @IsString({ each: true })
    seen: string[];
}
