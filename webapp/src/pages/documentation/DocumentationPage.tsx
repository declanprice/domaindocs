import { Box, Flex } from '@chakra-ui/react';
import { DocumentationToolbar } from './DocumentationPageToolbar';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { DocumentationNavigator } from '../../components/documentation/navigator/DocumentationNavigator';
import { DocumentationCategory, DocumentationType } from '@domaindocs/lib';

export const DocumentationPage = () => {
  const { domainId } = useParams() as DomainPageParams;

  return (
    <Flex direction="column" width={'100%'}>
      <DocumentationToolbar domainId={domainId} />

      <Flex height={'100%'} width={'100%'} direction={'column'}>
        <DocumentationNavigator
          documentation={[
            {
              documentationId: '1',
              name: 'Deed Search UI',
              type: DocumentationType.FILE,
              category: DocumentationCategory.PROJECT,
              isFolder: true,
              documentation: [
                {
                  documentationId: '2',
                  name: 'Project Plan',
                  type: DocumentationType.FILE,
                  category: null,
                  isFolder: false,
                  documentation: [],
                },
                {
                  documentationId: '3',
                  name: 'Logo',
                  type: DocumentationType.FILE,
                  category: null,
                  isFolder: true,
                  documentation: [
                    {
                      documentationId: '4',
                      name: 'Nested Logo',
                      type: DocumentationType.FILE,
                      category: null,
                      isFolder: false,
                      documentation: [],
                    },
                  ],
                },
              ],
            },
            {
              documentationId: '2',
              name: 'Deed Search API',
              type: DocumentationType.FILE,
              isFolder: true,
              category: DocumentationCategory.PROJECT,
              documentation: [
                {
                  documentationId: '5',
                  name: 'Project Plan',
                  type: DocumentationType.FILE,
                  category: null,
                  isFolder: false,
                  documentation: [],
                },
                {
                  documentationId: '6',
                  name: 'Logo',
                  type: DocumentationType.FILE,
                  category: null,
                  isFolder: false,
                  documentation: [],
                },
              ],
            },
          ]}
          onDocumentClick={() => {}}
        />

        <Box flex={1}></Box>
      </Flex>
    </Flex>
  );
};
