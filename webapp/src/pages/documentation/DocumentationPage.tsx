import { Box, Flex } from '@chakra-ui/react';
import { DocumentationToolbar } from './DocumentationPageToolbar';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { DocumentationNavigator } from '../../components/documentation/navigator/DocumentationNavigator';
import { Documentation, ProjectDocumentation } from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';

export const DocumentationPage = () => {
  const { domainId } = useParams() as DomainPageParams;

  const { data, isLoading } = useQuery<ProjectDocumentation[]>({
    queryKey: ['searchDocumentation', { domainId }],
    queryFn: () => documentationApi.search(domainId, {}),
  });

  if (!data || isLoading) return <LoadingContainer />;

  return (
    <Flex direction="column" width={'100%'}>
      <DocumentationToolbar domainId={domainId} />

      <Flex height={'100%'} width={'100%'} direction={'column'}>
        <DocumentationNavigator
          documentation={data}
          onDocumentClick={() => {}}
        />

        <Box flex={1}></Box>
      </Flex>
    </Flex>
  );
};
