import { OnboardingGuideProgress } from './onboarding-guide-progress';
import { OnboardingGuideStep } from '@prisma/client';

export class OnboardingGuide {
    constructor(
        public guideId: string,
        public name: string,
    ) {}
}

export class DetailedOnboardingGuide {
    constructor(
        public guide: OnboardingGuide,
        public steps: OnboardingGuideStep[],
        public progress: OnboardingGuideProgress | null,
    ) {}
}
