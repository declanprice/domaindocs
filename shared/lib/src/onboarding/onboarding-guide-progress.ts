export enum OnboardingGuideStepProgressStatus {
    NOT_SEEN = 'Not Seen',
    SEEN = 'Seen',
}

export enum OnboardingGuideProgressStatus {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETE = 'Complete',
}

export class OnboardingGuideProgress {
    constructor(
        public progress: { stepId: string; status: OnboardingGuideStepProgressStatus }[],
        public status: OnboardingGuideProgressStatus,
    ) {}
}
