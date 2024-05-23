import { Box, Button, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { OnboardingGuidePageToolbar } from './OnboardingGuidePageToolbar';
import {
    DetailedOnboardingGuide,
    DocumentationType,
    OnboardingGuideStep,
    OnboardingGuideStepType,
} from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { onboardingApi } from '../../state/api/onboarding-api';
import { OnboardingGuidePageParams } from './OnboardingGuidePageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { LiaCheckCircle, LiaCircle } from 'react-icons/lia';
import { FilePanel } from '../../components/documentation/panels/file/FilePanel';
export const OnboardingGuidePage = () => {
    const { domainId, guideId } = useParams() as OnboardingGuidePageParams;

    const { data: guide, isLoading } = useQuery<DetailedOnboardingGuide>({
        queryKey: ['getOnboardingGuide', { domainId, guideId }],
        queryFn: () => onboardingApi.get(domainId, guideId),
    });

    if (!guide || isLoading) return <LoadingContainer />;

    const renderStepType = (step: OnboardingGuideStep) => {
        if (step.type === OnboardingGuideStepType.DOCUMENTATION) {
            return <Text fontSize={10}>Read Documentation</Text>;
        }

        if (step.type === OnboardingGuideStepType.NOTE) {
            return <Text fontSize={10}>Read Note</Text>;
        }

        if (step.type === OnboardingGuideStepType.FILE) {
            return <Text fontSize={10}>See File</Text>;
        }

        return <></>;
    };

    return (
        <Flex direction="column" width={'100%'}>
            <OnboardingGuidePageToolbar domainId={domainId} guideName={guide.guide.name} />

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
                    <Box p={3}>
                        <Text fontSize={12}>1 Of 2 Steps Complete</Text>
                    </Box>

                    <List width={'100%'}>
                        {guide.steps.map((step) => (
                            <ListItem
                                key={step.stepId}
                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                py={1}
                            >
                                <Flex alignItems={'center'}>
                                    <IconButton
                                        aria-label={''}
                                        icon={<LiaCheckCircle />}
                                        variant={'ghost'}
                                        size={'lg'}
                                    />

                                    <Flex direction={'column'}>
                                        <Text fontSize={12}>{step.name}</Text>
                                        {renderStepType(step)}
                                    </Flex>
                                </Flex>
                            </ListItem>
                        ))}

                        <ListItem key={'finished'} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} py={1}>
                            <Flex alignItems={'center'}>
                                <IconButton aria-label={''} icon={<LiaCircle />} variant={'ghost'} size={'lg'} />

                                <Flex direction={'column'}>
                                    <Text fontSize={12}>Complete</Text>
                                </Flex>
                            </Flex>
                        </ListItem>
                    </List>
                </Flex>

                <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                    <FilePanel
                        toolbar={false}
                        domainId={domainId}
                        documentation={{
                            documentationId: 'deedsearch-file1',
                            updatedAt: new Date().toString(),
                            createdAt: new Date().toString(),
                            type: DocumentationType.DOCUMENTATION,
                            name: 'File Name',
                            createdBy: {
                                firstName: 'Declan',
                                lastName: 'Price',
                            },
                        }}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};
