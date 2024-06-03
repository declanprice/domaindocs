import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';

export const DomainDocumentationPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    // const {
    //     data: documentation,
    //     isLoading: isDocumentationLoading,
    //     refetch: searchDocumentation,
    // } = useQuery<Documentation[]>({
    //     queryKey: ['searchDocumentation', { domainId }],
    //     queryFn: () => documentationApi.search(domainId, { domainId }),
    // });
    //
    // if (!documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            docs
        </Flex>
    );
};
