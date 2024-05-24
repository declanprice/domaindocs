import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { OnboardingPageToolbar } from './OnboardingPageToolbar';
import { DetailedOnboardingGuide } from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { onboardingApi } from '../../state/api/onboarding-api';
import { OnboardingRecommendedList } from './components/OnboardingRecommendedList';
import { OnboardingTable } from './components/OnboardingTable';
import { TableToolbar } from '../../components/table/TableToolbar';
import { IoAddOutline } from 'react-icons/io5';
import { PeopleTable } from '../people/components/PeopleTable';

export const OnboardingPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: recommended, isLoading: isRecommendedLoading } = useQuery<DetailedOnboardingGuide[]>({
        queryKey: ['getRecommendedGuides', { domainId }],
        queryFn: () => onboardingApi.getRecommended(domainId),
    });

    const { data: guides, isLoading: isGuidesLoading } = useQuery<DetailedOnboardingGuide[]>({
        queryKey: ['searchOnboardingGuides', { domainId }],
        queryFn: () => onboardingApi.search(domainId),
    });

    if (!recommended || isRecommendedLoading || !guides || isGuidesLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <OnboardingPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Flex p={4} width={'100%'} direction={'column'}>
                        <OnboardingRecommendedList domainId={domainId} guides={recommended} />
                    </Flex>

                    <Flex p={4} width={'100%'} direction={'column'}>
                        <TableToolbar
                            title={`Onboarding Guides (${guides.length})`}
                            actions={
                                <Button
                                    fontSize={12}
                                    variant={'ghost'}
                                    size={'sm'}
                                    fontWeight={'regular'}
                                    leftIcon={<IoAddOutline />}
                                    onClick={() => {
                                        navigate(`/${domainId}/onboarding/new`);
                                    }}
                                >
                                    New Guide
                                </Button>
                            }
                            onSearch={() => {}}
                            onFilterClick={() => {}}
                        />

                        <OnboardingTable
                            guides={guides}
                            onGuideClick={(guide) => {
                                navigate(`/${domainId}/onboarding/${guide.guide.guideId}`);
                            }}
                        />
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
