import { OnboardingGuide, OnboardingGuideStep } from '@prisma/client';
import { ros } from './domain';
import { softwareDevRole } from './roles';
import { teamOrion } from './teams';
import { deedSearchProject } from './projects';
import { OnboardingStepType } from '../../lib/src';

export const onboarding = (): OnboardingGuide[] => {
    return [
        {
            guideId: '1',
            domainId: ros().domainId,
            name: 'Software Developer - Onboarding',
            roleIds: [softwareDevRole().roleId],
            teamIds: [],
        },
        {
            guideId: '2',
            domainId: ros().domainId,
            name: 'Team Orion - Onboarding',
            roleIds: [],
            teamIds: [teamOrion().teamId],
        },
        {
            guideId: '3',
            domainId: ros().domainId,
            name: 'Manager - Onboarding',
            roleIds: [],
            teamIds: [],
        },
    ];
};

export const onboardingSteps = (): OnboardingGuideStep[] => {
    return [
        {
            stepId: '1',
            guideId: '1',
            domainId: ros().domainId,
            name: 'Welcome',
            type: OnboardingStepType.NOTE,
            note: 'i am a note',
            documentationId: null,
            fileId: null,
            videoId: null,
        },
        {
            stepId: '2',
            guideId: '1',
            domainId: ros().domainId,
            name: 'General Developer Setup',
            type: OnboardingStepType.DOCUMENTATION,
            note: null,
            documentationId: `${deedSearchProject().projectId}-file1`,
            fileId: null,
            videoId: null,
        },
    ];
};
