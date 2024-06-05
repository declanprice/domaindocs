import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/types';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Button, Flex, Text } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';

export const TeamSettingsPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    const form = useForm({
        values: {
            name: team?.team.name,
        },
    });

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16}>Details</Text>
                        <Text fontSize={12}>Simple Team Details</Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <FormTextInput name={'name'} control={form.control} label={'Team Name'} />
                    </Flex>
                </Flex>

                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16}>Danger Area</Text>
                        <Text fontSize={12}>
                            Warning deleting a team is irreversible, you will lose all data relating to {team.team.name}{' '}
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <Button colorScheme={'red'} size={'sm'}>
                            Delete Team
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
