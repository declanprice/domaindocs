import { Box, Button, Flex, Heading, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SubdomainsTable } from './components/SubdomainsTable';
import { CreateSubdomainData, PagedResult, Subdomain } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { CreateSubdomainDialog } from './components/CreateSubdomainDialog';
import debounce from 'debounce';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../components/ui/pagination';
import React from 'react';
import { usePaging } from '../../hooks/usePaging';

export const SubdomainsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const createSubdomainDialog = useDisclosure();

    const pagination = usePaging({ pageSize: 5 });

    const searchForm = useForm({
        values: {
            name: '',
        },
    });

    const {
        data: result,
        isLoading,
        refetch,
    } = useQuery<PagedResult<Subdomain>>({
        queryKey: [
            'searchSubdomains',
            {
                domainId,
                page: pagination.page,
                pageSize: pagination.pageSize,
                search: searchForm.getValues('name'),
            },
        ],
        queryFn: async () => {
            const result = await subdomainsApi.search(domainId, {
                name: searchForm.getValues('name'),
                take: pagination.pageSize,
                offset: pagination.getOffset(),
            });

            pagination.setCount(result.total);

            return result;
        },
    });

    const { mutateAsync: createSubdomain } = useMutation({
        mutationFn: (data: CreateSubdomainData) => subdomainsApi.create(domainId, data),
        onSuccess: () => {
            refetch();
        },
    });

    const { mutateAsync: removeSubdomain } = useMutation({
        mutationFn: (subdomainId: string) => subdomainsApi.remove(domainId, subdomainId),
        onSuccess: () => {
            refetch();
        },
    });

    if (!result || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4} overflow={'auto'}>
            <Flex alignItems={'center'}>
                <Heading fontSize={18} fontWeight={400}>
                    Subdomains
                </Heading>

                <Button
                    ml={'auto'}
                    size={'sm'}
                    fontWeight={400}
                    onClick={() => {
                        createSubdomainDialog.onOpen();
                    }}
                >
                    Create Subdomain
                </Button>

                <CreateSubdomainDialog
                    isOpen={createSubdomainDialog.open}
                    onClose={createSubdomainDialog.onClose}
                    onOpen={createSubdomainDialog.onOpen}
                    onCreateSubdomain={createSubdomain}
                />
            </Flex>

            <Text fontWeight={300} fontSize={16}>
                Search for subdomains across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Box width={'280px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search subdomains'}
                        leftIcon={<CiSearch />}
                        onChange={debounce(() => {
                            refetch();
                        }, 500)}
                    />
                </Box>
            </Flex>

            <SubdomainsTable
                subdomains={result.data}
                onClick={(subdomain) => {
                    navigate(`/${domainId}/subdomains/${subdomain.subdomainId}/overview`);
                }}
                onRemove={async (subdomain) => {
                    await removeSubdomain(subdomain.subdomainId);
                }}
            />

            <PaginationRoot
                ml={'auto'}
                mt={2}
                count={pagination.count}
                pageSize={pagination.pageSize}
                defaultPage={pagination.page}
                variant={'solid'}
                onPageChange={(details: { page: number }) => {
                    pagination.setPage(details.page);
                }}
            >
                <HStack>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </Flex>
    );
};
