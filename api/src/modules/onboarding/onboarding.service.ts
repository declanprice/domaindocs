import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { PrismaService } from '../../shared/prisma.service';
import {
    DetailedOnboardingGuide,
    OnboardingGuide,
    OnboardingGuideProgress,
    OnboardingGuideProgressStatus,
    OnboardingGuideStep,
    OnboardingGuideStepType,
} from '@domaindocs/lib';

@Injectable()
export class OnboardingService {
    constructor(private prisma: PrismaService) {}

    async search(session: UserSession, domainId: string) {
        const results = await this.prisma.onboardingGuide.findMany({
            where: {
                domainId: domainId,
            },
            include: {
                steps: true,
                progress: {
                    where: {
                        userId: session.userId,
                    },
                },
            },
        });

        return results.map(
            (guide) =>
                new DetailedOnboardingGuide(
                    new OnboardingGuide(guide.guideId, guide.name),
                    guide.steps.map(
                        (step) => new OnboardingGuideStep(step.stepId, step.name, step.type as OnboardingGuideStepType),
                    ),
                    guide.progress[0]
                        ? new OnboardingGuideProgress(
                              JSON.parse(guide.progress[0].progress as string),
                              guide.progress[0].status as OnboardingGuideProgressStatus,
                          )
                        : null,
                ),
        );
    }

    async getRecommended(session: UserSession, domainId: string) {
        const person = await this.prisma.person.findUniqueOrThrow({
            where: {
                userId_domainId: {
                    userId: session.userId,
                    domainId,
                },
            },
            include: {
                roles: true,
                teamMembers: true,
            },
        });

        const roleIds = person.roles.map((r) => r.roleId);
        const teamIds = person.teamMembers.map((t) => t.teamId);

        const results = await this.prisma.onboardingGuide.findMany({
            where: {
                domainId: domainId,
                OR: [
                    {
                        roleIds: {
                            hasSome: roleIds,
                        },
                    },
                    {
                        teamIds: {
                            hasSome: teamIds,
                        },
                    },
                ],
            },
            include: {
                steps: true,
                progress: {
                    where: {
                        userId: session.userId,
                    },
                },
            },
        });

        return results.map(
            (guide) =>
                new DetailedOnboardingGuide(
                    new OnboardingGuide(guide.guideId, guide.name),
                    guide.steps.map(
                        (step) => new OnboardingGuideStep(step.stepId, step.name, step.type as OnboardingGuideStepType),
                    ),
                    guide.progress[0]
                        ? new OnboardingGuideProgress(
                              JSON.parse(guide.progress[0].progress as string),
                              guide.progress[0].status as OnboardingGuideProgressStatus,
                          )
                        : null,
                ),
        );
    }

    async get(session: UserSession, domainId: string, guideId: string) {
        const guide = await this.prisma.onboardingGuide.findUniqueOrThrow({
            where: {
                guideId,
            },
            include: {
                steps: true,
                progress: {
                    where: {
                        userId: session.userId,
                    },
                },
            },
        });

        return new DetailedOnboardingGuide(
            new OnboardingGuide(guide.guideId, guide.name),
            guide.steps.map(
                (step) => new OnboardingGuideStep(step.stepId, step.name, step.type as OnboardingGuideStepType),
            ),
            guide.progress![0]
                ? new OnboardingGuideProgress(
                      JSON.parse(guide.progress![0].progress as string),
                      guide.progress![0].status as OnboardingGuideProgressStatus,
                  )
                : null,
        );
    }
}
