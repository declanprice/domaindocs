import { OnboardingGuide } from '@prisma/client';
import { ros } from './domain';
import { softwareDevRole } from './roles';
import { teamOrion } from './teams';

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
