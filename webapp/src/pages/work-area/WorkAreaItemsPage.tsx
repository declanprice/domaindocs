import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { ItemsNavigator } from './components/items/ItemsNavigator';
import { ItemPanel } from './components/items/ItemPanel';
import { BiSearch } from 'react-icons/bi';
import { BacklogEpicNavigator } from './components/backlog/BacklogEpicNavigator';
import { BacklogBoardItems } from './components/backlog/BacklogBoardItems';
import { BacklogItemsList } from './components/backlog/BacklogItemsList';

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

            <Flex flex={1} direction={'column'} p={4} gap={4}>
                <Flex alignItems={'center'} borderBottom={'1px'} borderColor={'border'} pb={4}>
                    <InputGroup size={'sm'} maxWidth={'250px'}>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch color="gray.900" />
                        </InputLeftElement>
                        <Input variant={'filled'} placeholder="Search all items" backgroundColor={'lightgray'} />
                    </InputGroup>
                </Flex>

                <Flex flex={1} gap={4}>
                    <ItemsNavigator />

                    <Flex direction={'column'} width={'100%'} gap={8}>
                        <ItemPanel />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
