import { Box, Button, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { OnboardingGuidePageToolbar } from './OnboardingGuidePageToolbar';
import {
    DetailedDocumentation,
    DetailedOnboardingGuide,
    DocumentationType,
    OnboardingProgressStatus,
    OnboardingStep,
    OnboardingStepType,
    UpdateOnboardingProgressData,
} from '@domaindocs/lib';
import { useMutation, useQuery } from '@tanstack/react-query';
import { onboardingApi } from '../../state/api/onboarding-api';
import { OnboardingGuidePageParams } from './OnboardingGuidePageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { useEffect, useState } from 'react';
import { documentationApi } from '../../state/api/documentation-api';
import { FilePanel } from '../../components/documentation/panels/file/FilePanel';
import { DocumentPanel } from '../../components/documentation/panels/document/DocumentPanel';
import { OnboardingGuideNoteStep } from './components/OnboardingGuideNoteStep';
import { LiaCircle } from 'react-icons/lia';
import { AiOutlineEye } from 'react-icons/ai';

export const OnboardingGuidePage = () => {
    const { domainId, guideId } = useParams() as OnboardingGuidePageParams;

    const [activeStep, setActiveStep] = useState<OnboardingStep>();

    const { data: guide, isLoading: isGuideLoading } = useQuery<DetailedOnboardingGuide>({
        queryKey: ['getOnboardingGuide', { domainId, guideId }],
        queryFn: () => onboardingApi.get(domainId, guideId),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: fetchDocumentation,
    } = useQuery<DetailedDocumentation>({
        enabled: false,
        queryKey: ['activeDocumentation', { domainId, documentationId: activeStep?.documentationId! }],
        queryFn: () => documentationApi.get(domainId, activeStep?.documentationId!),
    });

    const { mutateAsync: updateProgress } = useMutation({
        mutationKey: ['updateProgress', { domainId, documentationId: activeStep?.documentationId! }],
        mutationFn: (progress: UpdateOnboardingProgressData) =>
            onboardingApi.updateProgress(domainId, guideId, progress),
    });

    useEffect(() => {
        if (guide) {
            setActiveStep(guide.steps[0]);
        }
    }, [guide]);

    useEffect(() => {
        if (!activeStep || !guide) return;

        if (activeStep.type === OnboardingStepType.DOCUMENTATION) {
            fetchDocumentation();
        }

        const seen = guide.progress.seen;

        const indexOf = seen.findIndex((s) => s == activeStep.stepId);

        if (indexOf === -1) {
            seen.push(activeStep.stepId);

            updateProgress({
                seen,
                status: OnboardingProgressStatus.IN_PROGRESS,
            });
        }
    }, [activeStep]);

    if (!guide || isGuideLoading) return <LoadingContainer />;

    const onStepClick = (step: OnboardingStep) => {
        setActiveStep(step);
    };

    const renderStepType = (step: OnboardingStep) => {
        if (step.type === OnboardingStepType.DOCUMENTATION) {
            return <Text fontSize={10}>Read Documentation</Text>;
        }

        if (step.type === OnboardingStepType.NOTE) {
            return <Text fontSize={10}>Read Note</Text>;
        }

        return null;
    };

    const renderActiveStep = (step: OnboardingStep) => {
        if (step.type === OnboardingStepType.DOCUMENTATION) {
            if (!documentation || isDocumentationLoading) {
                return <LoadingContainer />;
            }

            if (documentation.type === DocumentationType.FILE) {
                return <FilePanel toolbar={false} domainId={domainId} documentation={documentation} />;
            }

            if (documentation.type === DocumentationType.DOCUMENT) {
                return <DocumentPanel toolbar={false} documentation={documentation} />;
            }
        }

        if (step.type === OnboardingStepType.NOTE) {
            return <OnboardingGuideNoteStep note={step.note!} name={step.name} />;
        }

        return null;
    };

    const renderSeenIcon = (step: OnboardingStep) => {
        const seen = guide.progress.seen;

        const indexOf = seen.findIndex((s) => s == step.stepId);

        if (indexOf !== -1) {
            return (
                <IconButton aria-label={''} size={'sm'} variant={'ghost'} icon={<AiOutlineEye color={'gray.100'} />} />
            );
        }

        return <IconButton aria-label={''} size={'sm'} variant={'ghost'} icon={<LiaCircle color={'gray.100'} />} />;
    };

    const markComplete = async () => {
        guide.progress.status = OnboardingProgressStatus.COMPLETE;

        await updateProgress({
            seen: guide.progress.seen,
            status: OnboardingProgressStatus.COMPLETE,
        });
    };

    return (
        <Flex direction="column" width={'100%'}>
            <OnboardingGuidePageToolbar domainId={domainId} guideName={guide.guide.name}>
                {guide.progress.status !== OnboardingProgressStatus.COMPLETE && (
                    <Box ml={'auto'}>
                        <Button size={'xs'} onClick={markComplete}>
                            Mark Complete
                        </Button>
                    </Box>
                )}
            </OnboardingGuidePageToolbar>

            <Flex height={'100%'} width={'100%'}>
                <Flex
                    height={'100%'}
                    width={'40px'}
                    minWidth={'220px'}
                    borderRight={'1px solid'}
                    borderColor={'border'}
                    backgroundColor={'lightgray'}
                    direction={'column'}
                >
                    <List width={'100%'}>
                        {guide.steps.map((step) => (
                            <ListItem
                                key={step.stepId}
                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                backgroundColor={activeStep?.stepId === step.stepId ? 'gray.100' : undefined}
                                onClick={() => {
                                    onStepClick(step);
                                }}
                                p={2}
                            >
                                <Flex alignItems={'center'}>
                                    {renderSeenIcon(step)}

                                    <Flex direction={'column'}>
                                        <Text fontSize={12}>{step.name}</Text>
                                        {renderStepType(step)}
                                    </Flex>
                                </Flex>
                            </ListItem>
                        ))}
                    </List>
                </Flex>

                {activeStep && (
                    <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                        {renderActiveStep(activeStep)}
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};
