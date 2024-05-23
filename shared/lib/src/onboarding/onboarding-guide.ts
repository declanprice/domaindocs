import { OnboardingGuideProgress } from './onboarding-guide-progress';
import { OnboardingGuideStep } from './onboarding-guide-step';

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
