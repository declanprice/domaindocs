import { Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';

export const YourForms = () => {
    return (
        <Flex direction={'column'} gap={2}>
            <Flex>
                <Text fontSize={16}>Your Forms</Text>
            </Flex>

            <List>
                <ListItem
                    display={'flex'}
                    flexDirection={'column'}
                    p={3}
                    backgroundColor={'lightgray'}
                    width={'240px'}
                    rounded={4}
                    gap={2}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <Text fontSize={14}>Deed Search Bug</Text>

                    <Flex alignItems={'center'} gap={2}>
                        <Stack flex={0.4} gap={1}>
                            <Text fontSize={10}>New</Text>
                            <Text fontSize={12}>2</Text>
                        </Stack>

                        <Stack gap={1}>
                            <Text fontSize={10}>In Progress</Text>
                            <Text fontSize={12}>2</Text>
                        </Stack>
                    </Flex>
                </ListItem>
            </List>
        </Flex>
    );
};
