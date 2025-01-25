import { AvatarRoot, Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { BiBook } from 'react-icons/bi';

export const BacklogItemsList = () => {
    return (
        <Flex direction="column">
            <Flex borderBottom={'1px solid'} borderColor={'border'} width={'100%'} gap={4} py={2} alignItems="center">
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={14} fontWeight={'bold'}>
                        Backlog
                    </Text>

                    <Text fontSize={12}>2 Items</Text>
                </Flex>
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
                        <AvatarRoot size={'xs'}> Declan Price </AvatarRoot>
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

                <ListItem
                    display={'flex'}
                    alignItems={'center'}
                    height={'40px'}
                    p={2}
                    gap={3}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <Flex alignItems={'center'} gap={2}>
                        <AvatarRoot size={'xs'}> Declan Price </AvatarRoot>
                        <Text fontSize={12}>Declan Price</Text>
                    </Flex>

                    <Box divideY={'1px'} />

                    <Flex gap={2}>
                        <BiBook />
                        <Text fontSize={12}>Story 2</Text>
                    </Flex>

                    <Text ml={'auto'} fontSize={12}>
                        Ready
                    </Text>
                </ListItem>
            </List.Root>
        </Flex>
    );
};
