import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkArea, WorkItem } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { ItemsNavigator } from './components/items/ItemsNavigator';
import { ItemPanel } from './components/items/ItemPanel';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { useActiveItem } from './hooks/useActiveItem';

export const WorkAreaItemsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const { data: area, isLoading: isAreaLoading } = useQuery<DetailedWorkArea>({
        queryKey: ['getArea', { domainId, areaId }],
        queryFn: () => workApi().get(domainId, areaId),
    });

    const {
        data: items,
        isLoading: isItemsLoading,
        refetch: fetchItems,
    } = useQuery<WorkItem[]>({
        queryKey: ['searchItems', { domainId, areaId }],
        queryFn: () => workApi().searchItems(domainId, areaId),
    });

    const { item, isItemFetching, setActiveItemId, fetchItem } = useActiveItem(items);

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
                    <ItemsNavigator
                        domainId={domainId}
                        areaId={areaId}
                        items={items}
                        activeItemId={item?.id}
                        onItemClick={(item) => {
                            setActiveItemId(item.id);
                        }}
                    />

                    {isItemFetching ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            {item && (
                                <Flex direction={'column'} width={'100%'} gap={8}>
                                    <ItemPanel domainId={domainId} areaId={areaId} item={item} />
                                </Flex>
                            )}
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};
