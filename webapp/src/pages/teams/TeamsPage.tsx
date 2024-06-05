import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TeamsTable } from './components/TeamsTable';
import { DetailedTeam } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: teams, isLoading } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.search(domainId, {}),
    });

    const form = useForm({
        values: {
            name: '',
        },
    });

    if (!teams || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4}>
            <Flex alignItems={'center'}>
                <Heading variant={'h2'} fontSize={18} fontWeight={400}>
                    Teams
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    Create Team
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for teams across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Box maxWidth={'180px'}>
                    <FormTextInput
                        name={'name'}
                        control={form.control}
                        placeholder={'Search teams'}
                        leftElement={<CiSearch />}
                    />
                </Box>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Labels</Text>
                </Button>
            </Flex>

            <TeamsTable
                teams={teams}
                onTeamClick={(team) => {
                    navigate(`/${domainId}/teams/${team.team.teamId}`);
                }}
                onProjectClick={(project) => {
                    navigate(`/${domainId}/projects/${project.projectId}`);
                }}
            />
        </Flex>
    );
};
