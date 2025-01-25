import { Box, Button, Flex, IconButton, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { IoIosCheckboxOutline, IoMdAdd, IoMdRedo, IoMdUndo } from 'react-icons/io';
import { IoChevronDown, IoText } from 'react-icons/io5';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { MdFormatListNumbered } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Avatar, AvatarGroup } from '../../../ui/avatar';

export const DocumentToolbar = () => {
    return (
        <Flex height={'50px'} rounded={6} backgroundColor={'lightgray'} alignItems={'center'} p={2} gap={2}>
            <Button variant={'ghost'} size={'sm'} fontWeight={'normal'} fontSize={12}>
                <IoMdAdd /> Add
            </Button>

            <Box divideY={'1px'} />

            <IconButton size={'sm'} aria-label={'undo'} variant={'ghost'}>
                <IoMdUndo />
            </IconButton>
            <IconButton size={'sm'} aria-label={'redo'} variant={'ghost'}>
                <IoMdRedo />
            </IconButton>

            <Box divideY={'1px'} />

            <MenuRoot>
                <MenuTrigger as={Button} variant={'ghost'} onClick={() => {}} size={'sm'}>
                    <Flex alignItems={'center'} gap={2}>
                        <IoText />
                        <Text fontWeight={'normal'} fontSize={12}>
                            Normal Text
                        </Text>
                        <IoChevronDown />
                    </Flex>
                </MenuTrigger>
            </MenuRoot>

            <Box divideY={'1px'} />

            <IconButton size={'sm'} aria-label={'bulletpoint'} variant={'ghost'}>
                <HiOutlineListBullet fontSize={18} />
            </IconButton>

            <IconButton size={'sm'} aria-label={'numberlist'} variant={'ghost'}>
                <MdFormatListNumbered fontSize={18} />{' '}
            </IconButton>

            <IconButton size={'sm'} aria-label={'checklist'} variant={'ghost'}>
                <IoIosCheckboxOutline fontSize={18} />
            </IconButton>

            <Box divideY={'1px'} />

            <Button variant={'ghost'} size={'sm'} fontWeight={'normal'} fontSize={12}>
                Style
            </Button>

            <Flex ml={'auto'} gap={2}>
                <AvatarGroup>
                    <Avatar size={'xs'}> Declan Price</Avatar>
                </AvatarGroup>

                <IconButton size={'sm'} aria-label={'comments'} variant={'ghost'}>
                    <FaRegComments fontSize={18} />
                </IconButton>

                <IconButton size={'sm'} aria-label={'menu'} variant={'ghost'}>
                    <HiOutlineDotsHorizontal fontSize={18} />
                </IconButton>
            </Flex>
        </Flex>
    );
};
