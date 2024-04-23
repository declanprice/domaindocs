import { Flex } from '@chakra-ui/react';
import { DocumentationToolbar } from './DocumentationPageToolbar';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { Documentation } from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';

export const DocumentationPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, {}),
    });

    if (!documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <DocumentationToolbar domainId={domainId} />

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
