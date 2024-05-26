import { Box, Flex, Text } from '@chakra-ui/react';

export const ItemsNavigator = () => {
    return (
        <Flex
            height={'100%'}
            minWidth={'280px'}
            borderRight={'1px solid'}
            borderColor={'border'}
            backgroundColor={'lightgray'}
            p={4}
        >
            <Flex direction={'column'} width={'100%'}>
                <Flex>
                    <Text fontSize={14} color={'gray.900'} fontWeight={'bold'}>
                        Items
                    </Text>
                </Flex>
                <Flex mt={4} direction={'column'} gap={2}>
                    {[1, 2, 3].map(() => (
                        <Box
                            border={'1px solid'}
                            borderColor={'border'}
                            _hover={{
                                backgroundColor: 'gray.100',
                                cursor: 'pointer',
                            }}
                            rounded={4}
                            minHeight={'80px'}
                            height={'80px'}
                            maxHeight={'80px'}
                            backgroundColor={'white'}
                        ></Box>
                    ))}
                </Flex>{' '}
            </Flex>
        </Flex>
    );
};
