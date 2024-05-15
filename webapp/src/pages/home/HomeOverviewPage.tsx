import { Box, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { HomePageToolbar } from './HomePageToolbar';

export const HomeOverviewPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            <HomePageToolbar domainId={domainId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                        Welcome, Declan
                    </Heading>
                </Flex>
            </Box>
        </Flex>
    );
};
