import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbRoot, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedComponent } from '@domaindocs/types';

import { ComponentPageParams } from './ComponentPageParams';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { LuComponent } from 'react-icons/lu';

export const ComponentOverviewPage = () => {
    const { domainId, componentId } = useParams() as ComponentPageParams;

    const navigate = useNavigate();

    const { data: component, isLoading } = useQuery<DetailedComponent>({
        queryKey: ['getComponent', { domainId, componentId }],
        queryFn: () => componentsApi.getComponent(domainId, componentId),
    });

    if (!component || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <BreadcrumbRoot>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/${domainId}/people`}
                            fontSize={14}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${domainId}/components`);
                            }}
                        >
                            Components
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/components/${component.component.componentId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {component.component.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbRoot>

                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    backgroundColor={'teal.400'}
                    width={'50px'}
                    height="50px"
                    rounded={6}
                    p={2}
                >
                    <LuComponent color={'white'} />
                </Flex>

                <Text fontSize={18} fontWeight={500}>
                    {component.component.name}
                </Text>

                <Box mt={2}>{/*<TeamDescription domainId={domainId} team={team} />*/}</Box>
            </Flex>

            <Flex direction={'column'} width={'350px'} p={4} gap={4}></Flex>
        </Flex>
    );
};
