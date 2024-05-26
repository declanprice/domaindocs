import { Avatar, Button, ButtonGroup, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { IoAttach, IoSearchOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';
import { BiBook, BiEdit } from 'react-icons/bi';
import { EditIconButton } from '../../../../components/buttons/EditIconButton';
import { SiReacthookform } from 'react-icons/si';
import { FcEditImage } from 'react-icons/fc';

export const ItemPanel = () => {
    return (
        <Flex direction="column" p={4} width={'100%'} gap={2}>
            <ItemHeading />

            <Divider />

            <ItemDetails />

            <Divider />
        </Flex>
    );
};

export const ItemHeading = () => {
    return (
        <Flex direction={'column'} gap={2}>
            <Text fontSize={24} ml={2}>
                item 1
            </Text>

            <Flex gap={2} alignItems={'center'}>
                <Button size={'sm'} leftIcon={<BiEdit />} variant={'ghost'} fontWeight={'normal'}>
                    Epic
                </Button>

                <Divider orientation={'vertical'} height={'20px'} />

                <Button
                    alignItems={'center'}
                    size={'sm'}
                    leftIcon={<SiReacthookform />}
                    variant={'ghost'}
                    fontWeight={'normal'}
                >
                    Story
                </Button>

                <Divider orientation={'vertical'} height={'20px'} />

                <Button
                    alignItems={'center'}
                    size={'sm'}
                    leftIcon={<IoAttach />}
                    variant={'ghost'}
                    fontWeight={'normal'}
                >
                    Attach
                </Button>
            </Flex>
        </Flex>
    );
};

export const ItemDetails = () => {
    return (
        <Flex direction={'column'} gap={2}>
            <Text fontSize={16} ml={2}>
                Details
            </Text>

            <Flex gap={2} alignItems={'center'}></Flex>
        </Flex>
    );
};

export const ItemDescription = () => {
    return <Flex></Flex>;
};
