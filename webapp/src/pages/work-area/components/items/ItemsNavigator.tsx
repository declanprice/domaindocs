import { Box, Flex, Text } from '@chakra-ui/react';
import { WorkItem } from '@domaindocs/types';

type ItemsNavigatorProps = {
    items: WorkItem[];
    onItemClick: (item: WorkItem) => void;
};

export const ItemsNavigator = (props: ItemsNavigatorProps) => {
    const { items, onItemClick } = props;

    return (
        <Flex height={'100%'} minWidth={'250px'} rounded={4} backgroundColor={'lightgray'} p={1}>
            <Flex direction={'column'} width={'100%'}>
                <Flex p={2}>
                    <Text fontSize={14} color={'gray.900'} fontWeight={'bold'}>
                        Items
                    </Text>
                </Flex>
                <Flex mt={4} direction={'column'} gap={2}>
                    {items.map((item) => (
                        <Box
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
                            minHeight={'60px'}
                            height={'60px'}
                            maxHeight={'60px'}
                            backgroundColor={'white'}
                        ></Box>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
