export enum OnboardingProgressStatus {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETE = 'Complete',
}

export class OnboardingProgress {
    constructor(
        public status: OnboardingProgressStatus = OnboardingProgressStatus.NOT_STARTED,
        public seen: string[] = [],
    ) {}
}
