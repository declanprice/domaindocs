import { Box, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TeamsTable } from './components/TeamsTable';
import { CreateTeamData, DetailedTeam } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import { CreateTeamDialog } from './components/CreateTeamDialog';
import { FormMenuCheckboxSelect } from '../../components/form/FormMenuCheckboxSelect';

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const createTeamDialog = useDisclosure();

    const searchForm = useForm({
        values: {
            name: '',
            labels: [],
        },
    });

    const {
        data: teams,
        isLoading,
        refetch: searchTeams,
    } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () =>
            teamsApi.search(domainId, {
                name: searchForm.getValues('name'),
            }),
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

    if (!teams || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4}>
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
                <Box width={'280px'}>
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
                        searchTeams();
                    }, 50)}
                />
            </Flex>

            <TeamsTable
                teams={teams}
                onTeamClick={(team) => {
                    navigate(`/${domainId}/teams/${team.team.teamId}`);
                }}
                onRemove={async (team) => {
                    await removeTeam(team.team.teamId);
                }}
            />
        </Flex>
    );
};
