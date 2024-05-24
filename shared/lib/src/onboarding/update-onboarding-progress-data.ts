import { IsString } from 'class-validator';
import { OnboardingProgressStatus } from '@domaindocs/lib';

export class UpdateOnboardingProgressData {
    @IsString()
    status: OnboardingProgressStatus;

    @IsString({ each: true })
    seen: string[];
}
