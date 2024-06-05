import { Documentation } from '@domaindocs/types';
import { Flex, List, Stack, Text } from '@chakra-ui/react';
import { DocumentationFolder } from './DocumentationFolder';
import { GoPeople } from 'react-icons/go';

type DocsNavigatorProps = {
    documentation: Documentation[];
    onDocumentationClick?: (documentation: Documentation) => any;
    readonly?: boolean;
    onAddFile?: (documentation: Documentation) => void;
    onAddFolder?: (documentation: Documentation) => void;
    onAddDocument?: (documentation: Documentation) => void;
    onRemoveDocumentation?: (documentation: Documentation) => void;
    activeDocumentation?: Documentation;
};

export const DocumentationNavigator = (props: DocsNavigatorProps) => {
    const {
        documentation,
        readonly,
        activeDocumentation,
        onAddDocument,
        onAddFile,
        onAddFolder,
        onRemoveDocumentation,
        onDocumentationClick,
    } = props;

    return (
        <Flex height={'100%'} minWidth={'250px'} rounded={6} backgroundColor={'lightgray'}>
            <List width={'100%'} height={'100%'} p={2} spacing={1}>
                {documentation.map((doc) => (
                    <DocumentationFolder
                        readonly={readonly}
                        documentation={doc}
                        activeDocumentation={activeDocumentation}
                        onAddFile={onAddFile}
                        onAddFolder={onAddFolder}
                        onAddDocument={onAddDocument}
                        onDocumentationClick={onDocumentationClick}
                        onRemoveDocumentation={onRemoveDocumentation}
                    />
                ))}
            </List>
        </Flex>
    );
};
