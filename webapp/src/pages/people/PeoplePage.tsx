import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { PagedResult, SearchPerson } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { PeopleTable } from './components/PeopleTable';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';
import { usePaging } from '../../hooks/usePaging';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../components/ui/pagination';
import React from 'react';
import { FormMenuCheckboxSelect } from '../../components/form/FormMenuCheckboxSelect';
import debounce from 'debounce';

type PeoplePageParams = {
    domainId: string;
};

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams;

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
    } = useQuery<PagedResult<SearchPerson>>({
        queryKey: [
            'searchPeople',
            {
                domainId,
                search: searchForm.getValues('name'),
                take: pagination.pageSize,
                offset: pagination.getOffset(),
            },
        ],
        queryFn: async () => {
            const result = await peopleApi.search(domainId, {
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
                    People
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    Invite People
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for people across your domain.
            </Text>

            <Flex gap={2} mt={4}>
                <Box minWidth={'280px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search people'}
                        leftIcon={<CiSearch />}
                        onChange={debounce(() => {
                            refetch();
                        }, 500)}
                    />
                </Box>

                <FormMenuCheckboxSelect
                    name={'roles'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Roles</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />

                <FormMenuCheckboxSelect
                    name={'skills'}
                    control={searchForm.control}
                    options={[
                        { value: '1', label: 'Label 1' },
                        { value: '2', label: 'Label 2' },
                    ]}
                    renderButton={() => <Button variant={'outline'}>Skills</Button>}
                    renderOption={(option) => <Text key={option.value}>{option.label}</Text>}
                    onChange={debounce(() => {
                        // searchTeams();
                    }, 50)}
                />
            </Flex>

            <PeopleTable
                people={result.data}
                onPersonClick={(person) => {
                    navigate(`/${domainId}/people/${person.person.userId}`);
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
