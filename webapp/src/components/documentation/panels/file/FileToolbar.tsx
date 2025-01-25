import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { FaRegComments } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { PiUploadSimpleThin } from 'react-icons/pi';
import { Avatar, AvatarGroup } from '../../../ui/avatar';

export const FileToolbar = () => {
    return (
        <Flex height={'50px'} rounded={6} backgroundColor={'lightgray'} alignItems={'center'} p={2} gap={2}>
            <Button variant={'ghost'} size={'sm'} fontWeight={'normal'} fontSize={12}>
                <PiUploadSimpleThin size={18} color={'gray.900'} /> Upload
            </Button>

            <Box divideY={'1px'} />

            <Flex ml={'auto'} gap={2}>
                <AvatarGroup>
                    <Avatar size={'xs'} name={'Declan Price'} />
                </AvatarGroup>

                <IconButton size={'sm'} aria-label={'comments'} variant={'ghost'}>
                    <FaRegComments fontSize={18} />{' '}
                </IconButton>

                <IconButton size={'sm'} aria-label={'menu'} variant={'ghost'}>
                    <HiOutlineDotsHorizontal fontSize={18} />{' '}
                </IconButton>
            </Flex>
        </Flex>
    );
};
