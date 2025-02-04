import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedComponent } from '@domaindocs/types';
import React from 'react';
import { LuComponent } from 'react-icons/lu';
import { ComponentPageParams } from './ComponentPageParams';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { BreadcrumbLink, BreadcrumbRoot } from '../../components/ui/breadcrumb';
import { ComponentDescription } from './components/ComponentDescription';
import { ComponentDetails } from './components/ComponentDetails';

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
                    <BreadcrumbLink
                        href={`/${domainId}/components`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/components`);
                        }}
                        textStyle={'md'}
                    >
                        Components
                    </BreadcrumbLink>

                    <BreadcrumbLink
                        href={`/${domainId}/component/${component.component.componentId}`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        textStyle={'md'}
                    >
                        {component.component.name}
                    </BreadcrumbLink>
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
                    <LuComponent color={'white'} size={24} />
                </Flex>

                <Text fontSize={24} fontWeight={500}>
                    {component.component.name}
                </Text>

                <ComponentDescription domainId={domainId} component={component} />
            </Flex>

            <Flex direction={'column'} width={'450px'} p={4} gap={4}>
                <ComponentDetails domainId={domainId} component={component} />
            </Flex>
        </Flex>
    );
};
