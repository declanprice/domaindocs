import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Flex } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { ItemsNavigator } from './components/items/ItemsNavigator';
import { ItemPanel } from './components/items/ItemPanel';

export const WorkAreaItemsPage = () => {
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
                <ItemsNavigator />

                <Flex width={'100%'}>
                    <ItemPanel />
                </Flex>
            </Flex>
        </Flex>
    );
};
