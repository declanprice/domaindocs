import { Avatar, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { IoAttach } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { SiReacthookform } from 'react-icons/si';

export const ItemPanel = () => {
    return (
        <Flex direction="column" p={6} width={'100%'} gap={2}>
            <ItemHeading />

            <Divider />

            <ItemDetails />

            <Divider />

            <ItemDescription />
        </Flex>
    );
};

export const ItemHeading = () => {
    return (
        <Flex direction={'column'} gap={2}>
            <Text fontSize={24}>item 1</Text>

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
        <Flex direction={'column'} gap={2} py={2}>
            <Text fontSize={16}>Details</Text>

            <Flex gap={4} direction={'column'}>
                <Stack spacing={1}>
                    <Text fontSize={12}>Created by</Text>
                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar name={'Declan Price'} size={'xs'} />
                        <Text fontSize={12}>Declan Price</Text>
                    </Flex>
                </Stack>

                <Stack spacing={1}>
                    <Text fontSize={12}>Assigned to</Text>
                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar name={'Ben Munroe'} size={'xs'} />
                        <Text fontSize={12}>Ben Munroe</Text>
                    </Flex>
                </Stack>
            </Flex>
        </Flex>
    );
};

export const ItemDescription = () => {
    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Text fontSize={16}>Description</Text>

            <Flex>
                <Text fontSize={12}>i am a description</Text>
            </Flex>
        </Flex>
    );
};
