import { Box, Flex } from '@chakra-ui/react';
import { DocumentationNavigator } from './navigator/DocumentationNavigator';
import { Documentation, DocumentationType, ViewDocumentation } from '@domaindocs/lib';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../loading/LoadingContainer';
import { FilePanel } from './panels/file/FilePanel';
import { DocumentPanel } from './panels/document/DocumentPanel';

type DocumentationViewerProps = {
    domainId: string;
    documentation: Documentation[];
    onChange: () => any;
};

export const DocumentationViewer = (props: DocumentationViewerProps) => {
    const { domainId, documentation, onChange } = props;

    const [activeDocumentationId, setActiveDocumentationId] = useState<string>();

    const {
        data: viewerDocumentation,
        isLoading: isDocumentationLoading,
        refetch: getDocumentation,
    } = useQuery<ViewDocumentation>({
        enabled: false,
        queryKey: ['getDocumentation', { domainId, activeDocumentationId }],
        queryFn: () => documentationApi.get(domainId, activeDocumentationId!),
    });

    const { mutate: addDocumentation } = useMutation({
        mutationKey: [],
        mutationFn: async (data: { documentationId: string; type: DocumentationType }) => {
            await documentationApi.add(domainId, data.documentationId, data);
            onChange();
        },
    });

    useEffect(() => {
        if (activeDocumentationId) {
            getDocumentation().then();
        }
    }, [activeDocumentationId]);

    const renderPanel = () => {
        return <DocumentPanel document={{} as any} />;

        // if (!viewerDocumentation) return null;
        //
        // if (isDocumentationLoading) return <LoadingContainer />;
        //
        // if (viewerDocumentation.type === DocumentationType.FILE) {
        //     console.log(viewerDocumentation, isDocumentationLoading);
        //     return <FilePanel domainId={domainId} file={viewerDocumentation} />;
        // }
        //
        // if (viewerDocumentation.type === DocumentationType.DOCUMENT) {
        //     return <DocumentPanel />;
        // }
        //
        // return <>Unsupported documentation type</>;
    };

    return (
        <Flex height={'100%'} width={'100%'}>
            <DocumentationNavigator
                documentation={documentation}
                onDocumentationIdActive={(documentationId) => {
                    setActiveDocumentationId(documentationId);
                }}
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

            <Box flex={1}>{renderPanel()}</Box>
        </Flex>
    );
};
