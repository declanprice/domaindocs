import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/lib';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Flex } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';

export const WorkAreaIntegrationsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkBoard', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(),
    });

    if (!board || isBoardLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreaPageToolbar domainId={domainId} area={board.area} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}></Flex>
        </Flex>
    );
};
