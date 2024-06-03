import { Avatar, Divider, Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';

export const YourSubmissions = () => {
    return (
        <Flex direction={'column'} gap={2}>
            <Flex>
                <Text fontSize={16}>Your Submissions</Text>
            </Flex>

            <List spacing={2}>
                <ListItem
                    display={'flex'}
                    flexDirection={'column'}
                    p={2}
                    backgroundColor={'lightgray'}
                    rounded={4}
                    gap={2}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <Flex alignItems={'center'} gap={4} height={'40px'}>
                        <Stack gap={1}>
                            <Text fontSize={10}>Form</Text>
                            <Text fontSize={12}>Deed Search Bug</Text>
                        </Stack>

                        <Divider orientation={'vertical'} />

                        <Stack gap={1}>
                            <Text fontSize={10}>Status</Text>
                            <Text fontSize={12}>In Progress</Text>
                        </Stack>

                        <Flex ml={'auto'} gap={2} alignItems={'center'}>
                            <Flex direction={'column'}>
                                <Text fontSize={10}>Assigned To</Text>
                                <Text fontSize={12}>Declan Price</Text>
                            </Flex>

                            <Avatar size={'xs'} name={'Declan Price'} />
                        </Flex>

                        <Divider orientation={'vertical'} />

                        <Stack gap={1}>
                            <Text fontSize={10}>Submitted By</Text>
                            <Text fontSize={12}>You</Text>
                        </Stack>
                    </Flex>
                </ListItem>
            </List>
        </Flex>
    );
};
