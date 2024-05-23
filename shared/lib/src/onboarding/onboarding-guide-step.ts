export enum OnboardingGuideStepType {
    DOCUMENTATION = 'Documentation',
    FILE = 'File',
    NOTE = 'Note',
}

export class OnboardingGuideStep {
    constructor(
        public stepId: string,
        public name: string,
        public type: OnboardingGuideStepType,
    ) {}
}
