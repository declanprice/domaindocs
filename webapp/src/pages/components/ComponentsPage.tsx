import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DomainPageParams } from '../../types/DomainPageParams';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ComponentTable } from './components/ComponentTable';
import { PagedResult, SearchComponent } from '@domaindocs/types';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import { PeopleTable } from '../people/components/PeopleTable';
import { useForm } from 'react-hook-form';
import { FormMenuCheckboxSelect } from '../../components/form/FormMenuCheckboxSelect';
import debounce from 'debounce';
import React from 'react';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../components/ui/pagination';
import { usePaging } from '../../hooks/usePaging';

export const ComponentsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

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
    } = useQuery<PagedResult<SearchComponent>>({
        queryKey: [
            'searchComponents',
            {
                domainId,
                take: pagination.pageSize,
                offset: pagination.getOffset(),
                search: searchForm.getValues('name'),
            },
        ],
        queryFn: async () => {
            const result = await componentsApi.searchComponents(domainId, {
                name: searchForm.getValues('name'),
                take: pagination.pageSize,
                offset: pagination.getOffset(),
            });

            pagination.setCount(result.total);

            return result;
        },
    });

    if (!result || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4} overflow={'auto'}>
            <Flex alignItems={'center'}>
                <Heading fontSize={18} fontWeight={400}>
                    Components
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    Create Component
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for components across your domain.
            </Text>

            <Flex gap={2} mt={4}>
                <Box minWidth={'280px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search components'}
                        leftIcon={<CiSearch />}
                        onChange={debounce(() => {
                            refetch();
                        }, 500)}
                    />
                </Box>

                <FormMenuCheckboxSelect
                    name={'type'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Type</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />

                <FormMenuCheckboxSelect
                    name={'team'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Team</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />

                <FormMenuCheckboxSelect
                    name={'subdomain'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Subdomain</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />

                <FormMenuCheckboxSelect
                    name={'labels'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Labels</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />
            </Flex>

            <ComponentTable
                domainId={domainId}
                components={result.data}
                onComponentClick={(component: SearchComponent) => {
                    navigate(`/${domainId}/components/${component.component.componentId}`);
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
                <HStack mb={20}>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </Flex>
    );
};
