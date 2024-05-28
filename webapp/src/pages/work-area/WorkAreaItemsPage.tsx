import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkArea, DetailedWorkItem, WorkItem } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { ItemsNavigator } from './components/items/ItemsNavigator';
import { ItemPanel } from './components/items/ItemPanel';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';

export const WorkAreaItemsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const [activeItemId, setActiveItemId] = useState<string>();

    const { data: area, isLoading: isAreaLoading } = useQuery<DetailedWorkArea>({
        queryKey: ['getArea', { domainId, areaId }],
        queryFn: () => workApi().get(domainId, areaId),
    });

    const { data: items, isLoading: isItemsLoading } = useQuery<WorkItem[]>({
        queryKey: ['searchItems', { domainId, areaId }],
        queryFn: () => workApi().searchItems(domainId, areaId),
    });

    const {
        data: item,
        isFetching: isItemFetching,
        refetch: fetchItem,
    } = useQuery<DetailedWorkItem>({
        enabled: false,
        queryKey: ['getItem', { domainId, areaId, itemId: activeItemId! }],
        queryFn: () => workApi().getItem(domainId, areaId, activeItemId!),
    });

    useEffect(() => {
        if (!activeItemId && items && items.length) {
            setActiveItemId(items[0].id);
        }
    }, [items]);

    useEffect(() => {
        fetchItem().then();
    }, [activeItemId]);

    if (!area || !items || isAreaLoading || isItemsLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreaPageToolbar domainId={domainId} area={area.area} />

            <Flex flex={1} direction={'column'} p={4} gap={4}>
                <Flex alignItems={'center'} borderBottom={'1px'} borderColor={'border'} pb={4}>
                    <InputGroup size={'sm'} maxWidth={'250px'}>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch color="gray.900" />
                        </InputLeftElement>
                        <Input variant={'filled'} placeholder="Search all items" backgroundColor={'lightgray'} />
                    </InputGroup>

                    <Box ml={'auto'}>
                        <Button size={'sm'} leftIcon={<BiPlus />} backgroundColor={'lightgray'}>
                            Create Item
                        </Button>
                    </Box>
                </Flex>

                <Flex flex={1} gap={4}>
                    <ItemsNavigator />

                    {activeItemId && !item && isItemFetching ? (
                        <LoadingContainer />
                    ) : (
                        <Flex direction={'column'} width={'100%'} gap={8}>
                            <ItemPanel />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};
