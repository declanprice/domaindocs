import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FcDocument } from 'react-icons/fc';
import { CiSearch } from 'react-icons/ci';
import { UserMenu } from './UserMenu';
export const HeadingToolbar = () => {
    return (
        <Flex backgroundColor={'gray.800'} alignItems={'center'} height={'40px'} minHeight={'40px'} px={4}>
            <Box mr={4}>
                <FcDocument size={18} />
            </Box>

            <Button
                color={'gray.100'}
                size={'xs'}
                width={'250px'}
                fontWeight={'light'}
                backgroundColor={'gray.700'}
                overflow={'hidden'}
                mx={4}
                sx={{
                    _hover: {
                        backgroundColor: 'gray.500',
                    },
                }}
            >
                <Flex alignItems={'center'}>
                    <CiSearch color={'gray.700'} />
                    <Text ml={2}>Search..</Text>
                </Flex>
            </Button>

            <Box flex={1}></Box>

            <Flex alignItems={'center'} gap={4}>
                <UserMenu />
            </Flex>
        </Flex>
    );
};
