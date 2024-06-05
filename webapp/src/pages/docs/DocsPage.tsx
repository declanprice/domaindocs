import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { Documentation } from '@domaindocs/types';
import { useQuery } from '@tanstack/react-query';
import { documentationApi } from '../../state/api/documentation-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';
import { CiSearch } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../components/form/FormTextInput';

export const DocsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const form = useForm({
        values: {
            search: '',
        },
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, {}),
    });

    if (!documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'} p={4} direction="column" gap={2}>
            <Flex alignItems={'center'} gap={2}>
                <Box maxWidth={'250px'}>
                    <FormTextInput
                        name={'search'}
                        control={form.control}
                        placeholder={'Search all documentation'}
                        leftElement={<CiSearch />}
                    />
                </Box>

                <Button>
                    <Text ml={2}>Doc Type</Text>
                </Button>
            </Flex>

            <DocumentationViewer
                documentation={documentation}
                domainId={domainId}
                onChange={() => {
                    searchDocumentation();
                }}
            />
        </Flex>
    );
};
