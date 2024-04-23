import { Box, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { OnboardingPageToolbar } from './OnboardingPageToolbar';

export const OnboardingPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    // const { data: secrets, isLoading } = useQuery<Secret[]>({
    //   queryKey: ['getOnboardingProgress', { domainId }],
    //   queryFn: () => secretsApi.searchSecrets(domainId),
    // });
    //
    // if (!secrets || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <OnboardingPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Stack></Stack>
                </Flex>
            </Box>
        </Flex>
    );
};
