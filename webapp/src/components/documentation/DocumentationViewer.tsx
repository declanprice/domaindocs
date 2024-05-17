import { Box, Flex } from '@chakra-ui/react';
import { DocumentationNavigator } from './navigator/DocumentationNavigator';
import { DetailedDocumentation, Documentation, DocumentationType } from '@domaindocs/lib';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { DocumentPanel } from './panels/document/DocumentPanel';
import { FilePanel } from './panels/file/FilePanel';
import { LoadingContainer } from '../loading/LoadingContainer';

type DocumentationViewerProps = {
    domainId: string;
    documentation: Documentation[];
    onChange: () => any;
};

export const DocumentationViewer = (props: DocumentationViewerProps) => {
    const { domainId, documentation, onChange } = props;

    const [activeDocumentation, setActiveDocumentation] = useState<Documentation>();

    const {
        data: detailedActiveDocumentation,
        isLoading: isDocumentationLoading,
        refetch: getDocumentation,
    } = useQuery<DetailedDocumentation>({
        enabled: false,
        queryKey: ['getDocumentation', { domainId, documentationId: activeDocumentation?.documentationId! }],
        queryFn: () => documentationApi.get(domainId, activeDocumentation?.documentationId!),
    });

    const { mutate: addDocumentation } = useMutation({
        mutationKey: [],
        mutationFn: async (data: { documentationId: string; type: DocumentationType }) => {
            await documentationApi.add(domainId, data.documentationId, data);
            onChange();
        },
    });

    useEffect(() => {
        if (activeDocumentation) {
            getDocumentation().then();
        }
    }, [activeDocumentation]);

    const renderPanel = () => {
        if (isDocumentationLoading) return <LoadingContainer />;

        if (!activeDocumentation || !detailedActiveDocumentation) return null;

        if (detailedActiveDocumentation.type === DocumentationType.FILE) {
            return <FilePanel domainId={domainId} documentation={detailedActiveDocumentation} />;
        }

        if (detailedActiveDocumentation.type === DocumentationType.DOCUMENT) {
            return <DocumentPanel documentation={detailedActiveDocumentation} />;
        }

        return <>Unsupported documentation type</>;
    };

    return (
        <Flex height={'100%'} width={'100%'}>
            <DocumentationNavigator
                documentation={documentation}
                onDocumentationClick={(documentation) => {
                    setActiveDocumentation(documentation);
                }}
                onAddFile={(documentation) => {
                    addDocumentation({
                        documentationId: documentation.documentationId,
                        type: DocumentationType.FILE,
                    });
                }}
                onAddFolder={(documentation) => {
                    addDocumentation({
                        documentationId: documentation.documentationId,
                        type: DocumentationType.FOLDER,
                    });
                }}
            />

            <Box flex={1}>{renderPanel()}</Box>
        </Flex>
    );
};
