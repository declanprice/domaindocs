import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { WorkItem } from '@domaindocs/types';
import { ItemTypeIcon } from './ItemTypeIcon';
import { ItemAssignees } from './ItemAssignees';

type ItemsNavigatorProps = {
    domainId: string;
    areaId: string;
    items: WorkItem[];
    activeItemId?: string;
    onItemClick: (item: WorkItem) => void;
};

export const ItemsNavigator = (props: ItemsNavigatorProps) => {
    const { domainId, areaId, items, activeItemId, onItemClick } = props;

    return (
        <Flex height={'100%'} minWidth={'250px'} rounded={4} backgroundColor={'lightgray'} p={1}>
            <Flex direction={'column'} width={'100%'}>
                <Flex p={2}>
                    <Text fontSize={14} color={'gray.900'} fontWeight={'bold'}>
                        Items
                    </Text>
                </Flex>
                <List mt={4} spacing={2}>
                    {items.map((item) => (
                        <ListItem key={item.id}>
                            <Flex
                                onClick={() => {
                                    onItemClick(item);
                                }}
                                key={item.id}
                                border={'1px solid'}
                                borderColor={'border'}
                                _hover={{
                                    backgroundColor: 'gray.100',
                                    cursor: 'pointer',
                                }}
                                rounded={4}
                                p={3}
                                backgroundColor={activeItemId === item.id ? 'gray.100' : 'white'}
                                alignItems={'center'}
                                gap={2}
                            >
                                <ItemTypeIcon type={item.type} />

                                <Text fontSize={12} flex={1}>
                                    {item.name}
                                </Text>

                                <Box>
                                    <ItemAssignees domainId={domainId} areaId={areaId} item={item} iconOnly={true} />
                                </Box>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </Flex>
        </Flex>
    );
};
