import { Flex, Text } from '@chakra-ui/react';

export const BacklogEpicNavigator = () => {
    return (
        <Flex
            height={'100%'}
            minWidth={'280px'}
            borderRight={'1px solid'}
            borderColor={'border'}
            backgroundColor={'lightgray'}
            p={4}
        >
            <Flex>
                <Text fontSize={14} color={'gray.900'} fontWeight={'bold'}>
                    Epics
                </Text>
            </Flex>
        </Flex>
    );
};
