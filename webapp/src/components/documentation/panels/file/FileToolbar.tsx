import { Avatar, AvatarGroup, Button, Divider, Flex, IconButton } from '@chakra-ui/react';
import { FaRegComments } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { PiUploadSimpleThin } from 'react-icons/pi';

export const FileToolbar = () => {
    return (
        <Flex height={'50px'} rounded={6} backgroundColor={'lightgray'} alignItems={'center'} p={2} gap={2}>
            <Button
                leftIcon={<PiUploadSimpleThin size={18} color={'gray.900'} />}
                variant={'ghost'}
                size={'sm'}
                fontWeight={'normal'}
                fontSize={12}
            >
                Upload
            </Button>

            <Divider orientation={'vertical'} />

            <Flex ml={'auto'} gap={2}>
                <AvatarGroup>
                    <Avatar size={'xs'} name={'Declan Price'} />
                </AvatarGroup>

                <IconButton
                    size={'sm'}
                    aria-label={'comments'}
                    icon={<FaRegComments fontSize={18} />}
                    variant={'ghost'}
                />

                <IconButton
                    size={'sm'}
                    aria-label={'menu'}
                    icon={<HiOutlineDotsHorizontal fontSize={18} />}
                    variant={'ghost'}
                />
            </Flex>
        </Flex>
    );
};
