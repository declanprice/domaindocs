import { Box, Flex } from '@chakra-ui/react';
import { TeamPageToolbar } from './TeamPageToolbar';
import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam, Documentation } from '@domaindocs/types';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { documentationApi } from '../../state/api/documentation-api';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';

export const TeamDocsPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, { teamId }),
    });

    if (!team || !documentation || isLoading || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamPageToolbar teamName={team.team.name} domainId={domainId} teamId={teamId} />

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
