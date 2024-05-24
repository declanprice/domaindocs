export enum OnboardingStepType {
    DOCUMENTATION = 'Documentation',
    NOTE = 'Note',
}

export class OnboardingStep {
    constructor(
        public stepId: string,
        public name: string,
        public type: OnboardingStepType,
        public note: string | null,
        public documentationId: string | null,
    ) {}
}
