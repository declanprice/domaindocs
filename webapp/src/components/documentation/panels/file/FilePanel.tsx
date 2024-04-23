import { Box, Flex, Image } from '@chakra-ui/react';
import { FileDocumentation, ViewDocumentation } from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { filesApi } from '../../../../state/api/files-api';
import { SignedFileUrl } from '../../../../../../lib/src/file/signed-file-url';
import { LoadingContainer } from '../../../loading/LoadingContainer';

type FilePanelProps = {
    domainId: string;
    file: FileDocumentation;
};

export const FilePanel = (props: FilePanelProps) => {
    const { domainId, file } = props;

    const fileId = file.file.fileId;

    const { data: signedUrl, isLoading: isSignedUrlLoading } = useQuery<SignedFileUrl>({
        staleTime: 0,
        queryKey: ['getFileSignedUrl', { domainId, fileId }],
        queryFn: () => filesApi.getSignedUrl(domainId, fileId),
    });

    if (!signedUrl || isSignedUrlLoading) return <LoadingContainer />;

    return (
        <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Image src={signedUrl.url} />
        </Flex>
    );
};
