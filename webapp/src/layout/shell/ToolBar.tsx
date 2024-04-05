import {
    Avatar,
    Box,
    Button,
    Flex,
    Input,
    Text,
    WrapItem,
} from '@chakra-ui/react'
import { FcDocument } from 'react-icons/fc'
import { IoNotificationsOutline } from 'react-icons/io5'

export const Toolbar = () => {
    return (
        <Flex
            backgroundColor={'gray.700'}
            alignItems={'center'}
            height={'45px'}
            px={4}
        >
            <Box mr={8}>
                <FcDocument size={34} />
            </Box>

            <Button
                color={'gray.900'}
                size={'sm'}
                width={'250px'}
                backgroundColor={'gray.100'}
                overflow={'hidden'}
            >
                search registers of scotland
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
