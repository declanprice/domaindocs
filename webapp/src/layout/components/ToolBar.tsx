import { Avatar, Box, Button, Flex, Text, WrapItem } from '@chakra-ui/react'
import { FcDocument } from 'react-icons/fc'
import { CiSearch } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'

export const Toolbar = () => {
    return (
        <Flex
            backgroundColor={'gray.800'}
            alignItems={'center'}
            height={'45px'}
            px={4}
        >
            <Box mr={4}>
                <FcDocument size={18} />
            </Box>

            <Button
                color={'gray.100'}
                size={'sm'}
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
                <IoNotificationsOutline size={18} color={'white'} />

                <WrapItem>
                    <Avatar
                        size={'sm'}
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                    />
                </WrapItem>
            </Flex>
        </Flex>
    )
}
