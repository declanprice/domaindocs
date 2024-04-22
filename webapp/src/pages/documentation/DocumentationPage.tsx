import { Box, Flex } from '@chakra-ui/react';
import { DocumentationToolbar } from './DocumentationPageToolbar';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { DocumentationNavigator } from '../../components/documentation/navigator/DocumentationNavigator';
import { Documentation, DocumentationType } from '@domaindocs/lib';
import { useMutation, useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';

export const DocumentationPage = () => {
  const { domainId } = useParams() as DomainPageParams;

  const {
    data: documentation,
    isLoading,
    refetch,
  } = useQuery<Documentation[]>({
    queryKey: ['searchDocumentation', { domainId }],
    queryFn: () => documentationApi.search(domainId, {}),
  });

  const { mutate: addDocumentation } = useMutation({
    mutationKey: [],
    mutationFn: async (data: {
      documentationId: string;
      type: DocumentationType;
    }) => {
      await documentationApi.add(domainId, data.documentationId, data);
      refetch();
    },
  });

  if (!documentation || isLoading) return <LoadingContainer />;

  return (
    <Flex direction="column" width={'100%'}>
      <DocumentationToolbar domainId={domainId} />

      <Flex height={'100%'} width={'100%'} direction={'column'}>
        <DocumentationNavigator
          documentation={documentation}
          onDocumentClick={() => {}}
          onAddFile={(documentationId) => {
            addDocumentation({
              documentationId,
              type: DocumentationType.FILE,
            });
          }}
          onAddFolder={(documentationId) => {
            addDocumentation({
              documentationId,
              type: DocumentationType.FOLDER,
            });
          }}
        />

        <Box flex={1}></Box>
      </Flex>
    </Flex>
  );
};
