import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Flex } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { BacklogEpicNavigator } from './components/backlog/BacklogEpicNavigator';
import { BacklogBoardItems } from './components/backlog/BacklogBoardItems';
import { BacklogItemsList } from './components/backlog/BacklogItemsList';

export const WorkAreaBacklogPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkBoard', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(),
    });

    if (!board || isBoardLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreaPageToolbar domainId={domainId} area={board.area} />

            <Flex height={'100%'} width={'100%'}>
                <BacklogEpicNavigator />

                <Flex direction={'column'} p={6} width={'100%'} gap={8}>
                    <BacklogBoardItems />

                    <BacklogItemsList />
                </Flex>
            </Flex>
        </Flex>
    );
};
