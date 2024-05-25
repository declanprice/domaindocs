import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { HomePageToolbar } from './HomePageToolbar';
import { useQuery } from '@tanstack/react-query';
import { Documentation } from '@domaindocs/types';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';

export const HomeDocsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, { domainId }),
    });

    if (!documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <HomePageToolbar domainId={domainId} />

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
