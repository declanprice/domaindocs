import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ComponentPageParams } from './ComponentPageParams';
import { useQuery } from '@tanstack/react-query';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { DetailedComponent } from '@domaindocs/types';

export const ComponentDependenciesPage = () => {
    const { domainId, componentId } = useParams() as ComponentPageParams;

    const { data: component, isLoading } = useQuery<DetailedComponent>({
        queryKey: ['getComponent', { domainId, componentId }],
        queryFn: () => componentsApi.getComponent(domainId, componentId),
    });

    if (!component || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            deps
        </Flex>
    );
};
