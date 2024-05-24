import { Documentation } from '@domaindocs/lib';
import { Flex, List } from '@chakra-ui/react';
import { DocumentationFolder } from './DocumentationFolder';

type DocsNavigatorProps = {
    documentation: Documentation[];
    onDocumentationClick?: (documentation: Documentation) => any;
    readonly?: boolean;
    onAddFile?: (documentation: Documentation) => any;
    onAddFolder?: (documentation: Documentation) => any;
    activeDocumentation?: Documentation;
};

export const DocumentationNavigator = (props: DocsNavigatorProps) => {
    const { documentation, readonly, activeDocumentation, onDocumentationClick, onAddFile } = props;

    return (
        <Flex
            height={'100%'}
            minWidth={'220px'}
            borderRight={'1px solid'}
            borderColor={'border'}
            backgroundColor={'lightgray'}
        >
            <List width={'100%'} height={'100%'}>
                {documentation.map((doc) => (
                    <DocumentationFolder
                        readonly={true}
                        documentation={doc}
                        activeDocumentation={activeDocumentation}
                        onAddFile={(documentation) => {
                            if (onAddFile) {
                                onAddFile(documentation);
                            }
                        }}
                        onDocumentationClick={(documentation) => {
                            if (onDocumentationClick) {
                                onDocumentationClick(documentation);
                            }
                        }}
                    />
                ))}
            </List>
        </Flex>
    );
};
