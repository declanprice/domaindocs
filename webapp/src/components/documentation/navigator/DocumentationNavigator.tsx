import { Documentation } from '@domaindocs/lib';
import { Flex, List } from '@chakra-ui/react';
import { DocumentationFolder } from './DocumentationFolder';

type DocumentationNavigatorProps = {
  documentation: Documentation[];
  onDocumentClick: (documentation: Documentation) => any;
  onAddFile: (documentationId: string) => any;
  onAddFolder: (documentationId: string) => any;
};

export const DocumentationNavigator = (props: DocumentationNavigatorProps) => {
  const { documentation, onDocumentClick, onAddFile, onAddFolder } = props;

  return (
    <Flex
      height={'100%'}
      width={'40px'}
      minWidth={'200px'}
      borderRight={'1px solid'}
      borderColor={'border'}
      mt={2}
    >
      <List width={'100%'} height={'100%'}>
        {documentation.map((doc) => (
          <DocumentationFolder
            folderName={doc.name}
            folderSubtitle={doc.type}
            folderItems={doc.documentation}
            documentationId={doc.documentationId}
            onAddFile={(documentationId) => {
              onAddFile(documentationId);
            }}
          />
        ))}
      </List>
    </Flex>
  );
};
