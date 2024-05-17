import { Flex, Image } from '@chakra-ui/react';
import { DetailedDocumentation } from '@domaindocs/lib';

import { FileTitle } from './FileTitle';
import { FileDetails } from './FileDetails';
import { FileToolbar } from './FileToolbar';

type FilePanelProps = {
    domainId: string;
    documentation: DetailedDocumentation;
};

export const FilePanel = (props: FilePanelProps) => {
    const { domainId, documentation } = props;

    // const { data: signedUrl, isLoading: isSignedUrlLoading } = useQuery<SignedFileUrl>({
    //     staleTime: 0,
    //     queryKey: ['getFileSignedUrl', { domainId, fileId }],
    //     queryFn: () => filesApi.getSignedUrl(domainId, fileId),
    // });
    //
    // if (!signedUrl || isSignedUrlLoading) return <LoadingContainer />;

    return (
        <Flex width="100%" flexDirection="column">
            <FileToolbar />

            <Flex py={8} px={2} flexDirection={'column'} alignItems={'center'}>
                <FileTitle title={documentation.name} />

                <FileDetails
                    createdAt={new Date().toISOString()}
                    updatedAt={new Date().toISOString()}
                    createdBy={{
                        firstName: 'Declan',
                        lastName: 'Pride',
                    }}
                />

                <Image
                    maxWidth={'900px'}
                    width={'100%'}
                    mt={4}
                    src={
                        'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg'
                    }
                />
            </Flex>
        </Flex>
    );
};
