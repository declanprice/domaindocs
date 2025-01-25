import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { BiBook } from 'react-icons/bi';
import { Avatar } from '../../../../components/ui/avatar';

export const BacklogBoardItems = () => {
    return (
        <Flex
            width={'100%'}
            backgroundColor={'lightgray'}
            minHeight={'200px'}
            rounded={4}
            p={4}
            gap={4}
            direction={'column'}
        >
            <Flex alignItems={'center'} gap={4}>
                <Text fontSize={14} fontWeight={'bold'}>
                    Board
                </Text>

                <Text fontSize={12}>1 Item</Text>
            </Flex>

            <List.Root>
                <ListItem
                    display={'flex'}
                    alignItems={'center'}
                    height={'40px'}
                    p={2}
                    gap={3}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <Flex alignItems={'center'} gap={2}>
                        <Avatar name={'Declan Price'} size={'xs'} />
                        <Text fontSize={12}>Declan Price</Text>
                    </Flex>

                    <Box divideY={'1px'} />

                    <Flex gap={2}>
                        <BiBook />
                        <Text fontSize={12}>Story 1</Text>
                    </Flex>

                    <Text ml={'auto'} fontSize={12}>
                        In Progress
                    </Text>
                </ListItem>
            </List.Root>
        </Flex>
    );
};
