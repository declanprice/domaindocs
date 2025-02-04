import { Box, Button, Flex, Heading, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TeamsTable } from './components/TeamsTable';
import { CreateTeamData, DetailedTeam, PagedResult } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import { CreateTeamDialog } from './components/CreateTeamDialog';
import { FormMenuCheckboxSelect } from '../../components/form/FormMenuCheckboxSelect';
import { usePaging } from '../../hooks/usePaging';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../components/ui/pagination';
import React from 'react';

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const createTeamDialog = useDisclosure();

    const pagination = usePaging({ pageSize: 5 });

    const searchForm = useForm({
        values: {
            name: '',
            labels: [],
        },
    });

    const {
        data: result,
        isLoading,
        refetch: searchTeams,
    } = useQuery<PagedResult<DetailedTeam>>({
        queryKey: [
            'searchTeams',
            {
                domainId,
                page: pagination.page,
                pageSize: pagination.pageSize,
                search: searchForm.getValues('name'),
            },
        ],
        queryFn: async () => {
            const result = await teamsApi.search(domainId, {
                name: searchForm.getValues('name'),
                take: pagination.pageSize,
                offset: pagination.getOffset(),
            });

            pagination.setCount(result.total);

            return result;
        },
    });

    const { mutateAsync: createTeam } = useMutation({
        mutationFn: (data: CreateTeamData) => teamsApi.create(domainId, data),
        onSuccess: () => {
            searchTeams();
        },
    });

    const { mutateAsync: removeTeam } = useMutation({
        mutationFn: (teamId: string) => teamsApi.remove(domainId, teamId),
        onSuccess: () => {
            searchTeams();
        },
    });

    if (!result || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4} overflow={'auto'}>
            <Flex alignItems={'center'}>
                <Heading fontSize={18} fontWeight={400}>
                    Teams
                </Heading>

                <Button ml={'auto'} fontWeight={400} onClick={createTeamDialog.onOpen}>
                    Create Team
                </Button>

                <CreateTeamDialog
                    isOpen={createTeamDialog.open}
                    onClose={createTeamDialog.onClose}
                    onCreateTeam={createTeam}
                />
            </Flex>

            <Text fontWeight={300} fontSize={16}>
                Search for teams across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Box minWidth={'280px'} width={'280px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search teams'}
                        leftIcon={<CiSearch />}
                        onChange={debounce(() => {
                            searchTeams();
                        }, 500)}
                    />
                </Box>
            </Flex>

            <TeamsTable
                teams={result.data}
                onTeamClick={(team) => {
                    navigate(`/${domainId}/teams/${team.team.teamId}`);
                }}
                onRemove={async (team) => {
                    await removeTeam(team.team.teamId);
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
