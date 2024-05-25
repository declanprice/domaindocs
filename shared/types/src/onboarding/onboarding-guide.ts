import { OnboardingProgress } from './onboarding-progress';
import { OnboardingStep } from './onboarding-step';

export class OnboardingGuide {
    constructor(
        public guideId: string,
        public name: string,
    ) {}
}

export class DetailedOnboardingGuide {
    constructor(
        public guide: OnboardingGuide,
        public steps: OnboardingStep[],
        public progress: OnboardingProgress,
    ) {}
}
