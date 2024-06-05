import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedComponent, Documentation } from '@domaindocs/types';

import { ComponentPageParams } from './ComponentPageParams';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { documentationApi } from '../../state/api/documentation-api';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';
import React from 'react';
import { CiSearch } from 'react-icons/ci';

export const ComponentDocsPage = () => {
    const { domainId, componentId } = useParams() as ComponentPageParams;

    const { data: component, isLoading: isComponentLoading } = useQuery<DetailedComponent>({
        queryKey: ['getComponent', { domainId, componentId }],
        queryFn: () => componentsApi.getComponent(domainId, componentId),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId, componentId }],
        queryFn: () => documentationApi.search(domainId, { componentId }),
    });

    if (!component || isComponentLoading || !documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'} p={4} direction="column" gap={2}>
            <Flex alignItems={'center'} gap={2}>
                <Button size={'sm'} maxWidth={'250px'} color={'gray.900'} fontWeight={'300'}>
                    <CiSearch />
                    <Text ml={2} textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}>
                        Search {component.component.name.toLowerCase()} docs
                    </Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text ml={2}>Type</Text>
                </Button>
            </Flex>

            <DocumentationViewer
                documentation={documentation}
                domainId={domainId}
                onChange={() => {
                    searchDocumentation();
                }}
            />
        </Flex>
    );
};
