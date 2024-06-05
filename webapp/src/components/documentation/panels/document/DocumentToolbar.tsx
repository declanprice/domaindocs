import { Avatar, AvatarGroup, Box, Button, Divider, Flex, IconButton, Menu, MenuButton, Text } from '@chakra-ui/react';
import { IoIosCheckboxOutline, IoMdAdd, IoMdRedo, IoMdUndo } from 'react-icons/io';
import { IoChevronDown, IoText } from 'react-icons/io5';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { MdFormatListNumbered } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

export const DocumentToolbar = () => {
    return (
        <Flex height={'50px'} rounded={6} backgroundColor={'lightgray'} alignItems={'center'} p={2} gap={2}>
            <Button leftIcon={<IoMdAdd />} variant={'ghost'} size={'sm'} fontWeight={'normal'} fontSize={12}>
                Add
            </Button>

            <Divider orientation={'vertical'} />

            <IconButton size={'sm'} aria-label={'undo'} icon={<IoMdUndo />} variant={'ghost'} />
            <IconButton size={'sm'} aria-label={'redo'} icon={<IoMdRedo />} variant={'ghost'} />

            <Divider orientation={'vertical'} />

            <Menu>
                <MenuButton as={Button} variant={'ghost'} onClick={() => {}} size={'sm'}>
                    <Flex alignItems={'center'} gap={2}>
                        <IoText />
                        <Text fontWeight={'normal'} fontSize={12}>
                            Normal Text
                        </Text>
                        <IoChevronDown />
                    </Flex>
                </MenuButton>
            </Menu>

            <Divider orientation={'vertical'} />

            <IconButton
                size={'sm'}
                aria-label={'bulletpoint'}
                icon={<HiOutlineListBullet fontSize={18} />}
                variant={'ghost'}
            />
            <IconButton
                size={'sm'}
                aria-label={'numberlist'}
                icon={<MdFormatListNumbered fontSize={18} />}
                variant={'ghost'}
            />
            <IconButton
                size={'sm'}
                aria-label={'checklist'}
                icon={<IoIosCheckboxOutline fontSize={18} />}
                variant={'ghost'}
            />

            <Divider orientation={'vertical'} />

            <Button variant={'ghost'} size={'sm'} fontWeight={'normal'} fontSize={12}>
                Style
            </Button>

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
