import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/types';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export const TeamWorkPage = () => {
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
            work
        </Flex>
    );
};
