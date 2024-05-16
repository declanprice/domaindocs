import { Documentation } from '@domaindocs/lib';
import { Flex, List } from '@chakra-ui/react';
import { Folder } from './Folder';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type DocsNavigatorProps = {
    documentation: Documentation[];
    onDocumentationIdActive: (documentationId: string) => any;
    onAddFile: (documentationId: string) => any;
    onAddFolder: (documentationId: string) => any;
    activeDocumentation?: Documentation;
};

export const DocumentationNavigator = (props: DocsNavigatorProps) => {
    const { documentation, onDocumentationIdActive, onAddFile } = props;

    const [activeDocumentationId, setActiveDocumentationId] = useState<string>();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const active = searchParams.get('active');
        if (active) {
            setActiveDocumentationId(active);
            onDocumentationIdActive(active);
        }
    }, [searchParams]);

    return (
        <Flex height={'100%'} width={'40px'} minWidth={'200px'} borderRight={'1px solid'} borderColor={'border'}>
            <List width={'100%'} height={'100%'}>
                {documentation.map((doc) => (
                    <Folder
                        folderName={doc.name}
                        folderSubtitle={doc.type}
                        folderItems={doc.documentation}
                        documentationId={doc.documentationId}
                        activeDocumentationId={activeDocumentationId}
                        onAddFile={(documentationId) => {
                            onAddFile(documentationId);
                        }}
                        onDocumentationClick={(documentationId) => {
                            setActiveDocumentationId(documentationId);
                            setSearchParams({ ['active']: documentationId });
                            onDocumentationIdActive(documentationId);
                        }}
                    />
                ))}
            </List>
        </Flex>
    );
};
