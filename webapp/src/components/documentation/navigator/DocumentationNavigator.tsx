import { Documentation, ProjectDocumentation } from '@domaindocs/lib';
import { Flex, List } from '@chakra-ui/react';
import { DocumentationFolder } from './DocumentationFolder';

type DocumentationNavigatorProps = {
  documentation: ProjectDocumentation[];
  onDocumentClick: (documentation: Documentation) => any;
};

export const DocumentationNavigator = (props: DocumentationNavigatorProps) => {
  const { documentation, onDocumentClick } = props;

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
            folderName={doc.projectName}
            folderSubtitle={'Project'}
            folderItems={doc.documentation}
          />
        ))}
      </List>
    </Flex>
  );
};
