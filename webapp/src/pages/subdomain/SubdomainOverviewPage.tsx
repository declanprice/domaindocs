import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { SubdomainDetails } from './components/SubdomainDetails';
import { DetailedSubdomain } from '@domaindocs/types';
import { Avatar } from '../../components/ui/avatar';
import { SubdomainDescription } from './components/SubdomainDescription';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { SubdomainPageParams } from '../../types/SubdomainPageParams';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { GoPeople } from 'react-icons/go';
import { SubdomainContacts } from './components/SubdomainContacts';
import { SubdomainLinks } from './components/SubdomainLinks';
import { BreadcrumbLink, BreadcrumbRoot } from '../../components/ui/breadcrumb';

export const SubdomainOverviewPage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams;

    const navigate = useNavigate();

    const { data, isLoading } = useQuery<DetailedSubdomain>({
        queryKey: ['getSubdomain', { domainId, subdomainId }],
        queryFn: () => subdomainsApi.get(domainId, subdomainId),
    });

    if (!data || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <BreadcrumbRoot>
                    <BreadcrumbLink
                        href={`/${domainId}/subdomains`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/subdomains`);
                        }}
                    >
                        Subdomains
                    </BreadcrumbLink>

                    <BreadcrumbLink
                        href={`/${domainId}/subdomains/${data.subdomain.subdomainId}/overview`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {data.subdomain.name}
                    </BreadcrumbLink>
                </BreadcrumbRoot>

                <Flex
                    mt={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                    backgroundColor={'green.600'}
                    width={'50px'}
                    height="50px"
                    rounded={6}
                    p={2}
                >
                    <VscTypeHierarchySub color={'white'} />
                </Flex>

                <Text mt={2} fontSize={24} fontWeight={500}>
                    {data.subdomain.name}
                </Text>

                <Box mt={2}>
                    <SubdomainDescription subdomain={data.subdomain} />
                </Box>
            </Flex>

            <Flex direction={'column'} width={'450px'} p={4} gap={4}>
                <SubdomainDetails subdomain={data.subdomain} />

                <SubdomainContacts domainId={domainId} subdomainId={subdomainId} contacts={data.contacts} />

                <SubdomainLinks domainId={domainId} subdomainId={subdomainId} links={data.links} />
            </Flex>
        </Flex>
    );
};
