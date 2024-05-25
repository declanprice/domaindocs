import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { DetailedDocumentation, SignedFileUrl } from '@domaindocs/types';
import { useQuery } from '@tanstack/react-query';

import { FileTitle } from './FileTitle';
import { FileDetails } from './FileDetails';
import { FileToolbar } from './FileToolbar';
import { documentationApi } from '../../../../state/api/documentation-api';
import { LoadingContainer } from '../../../loading/LoadingContainer';
import { PiUploadSimpleThin } from 'react-icons/pi';

type FilePanelProps = {
    domainId: string;
    documentation: DetailedDocumentation;
    toolbar?: boolean;
};

export const FilePanel = (props: FilePanelProps) => {
    const { domainId, documentation, toolbar } = props;

    const { data: signedUrl, isLoading: isSignedUrlLoading } = useQuery<SignedFileUrl>({
        staleTime: 0,
        queryKey: ['getFileSignedUrl', { domainId, documentationId: documentation.documentationId }],
        queryFn: () => documentationApi.getDocumentationSignedUrl(domainId, documentation.documentationId),
    });

    if (!signedUrl || isSignedUrlLoading) return <LoadingContainer />;

    return (
        <Flex width="100%" flexDirection="column">
            {toolbar !== false && <FileToolbar />}

            <Flex py={8} px={2} flexDirection={'column'} alignItems={'center'}>
                <FileTitle title={documentation.name} />

                <FileDetails
                    createdAt={documentation.createdAt}
                    updatedAt={documentation.updatedAt}
                    createdBy={documentation.createdBy}
                />

                {signedUrl.url ? (
                    <Image maxWidth={'900px'} width={'100%'} mt={4} src={signedUrl.url} />
                ) : (
                    <Flex maxWidth={'900px'} width={'100%'} border={'1px solid'} borderColor={'border'} mt={4} p={4}>
                        <Button
                            leftIcon={<PiUploadSimpleThin size={18} color={'gray.900'} />}
                            variant={'ghost'}
                            size={'lg'}
                            fontWeight={'normal'}
                        >
                            Upload
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
