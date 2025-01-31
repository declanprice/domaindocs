import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { domainsApi } from '../../state/api/domains-api';
import { DomainDetails } from './components/DomainDetails';
import { DetailedDomain } from '@domaindocs/types';
import { Avatar } from '../../components/ui/avatar';
import { DomainDescription } from './components/DomainDescription';
import { DomainContacts } from './components/DomainContacts';
import { DomainLinks } from './components/DomainLinks';

export const DomainOverviewPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const { data: domain, isLoading } = useQuery<DetailedDomain>({
        queryKey: ['getDomain', { domainId }],
        queryFn: () => domainsApi.getDomain(domainId),
    });

    if (!domain || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <Avatar name={domain.domain.name} size={'2xl'} rounded={'lg'} />

                <Text mt={2} fontSize={24} fontWeight={500}>
                    {domain.domain.name}
                </Text>

                <Box mt={2}>
                    <DomainDescription domain={domain.domain} />
                </Box>
            </Flex>

            <Flex direction={'column'} width={'450px'} p={4} gap={4}>
                <DomainDetails domain={domain.domain} />

                <DomainContacts domainId={domainId} contacts={domain.contacts} />

                <DomainLinks domainId={domainId} links={domain.links} />
            </Flex>
        </Flex>
    );
};
