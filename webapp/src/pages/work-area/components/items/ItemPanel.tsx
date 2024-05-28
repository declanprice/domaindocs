import { Avatar, AvatarGroup, Button, Divider, Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { IoAttach } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { SiReacthookform } from 'react-icons/si';
import { DetailedWorkItem } from '@domaindocs/types';

type ItemPanelProps = {
    item: DetailedWorkItem;
};

export const ItemPanel = (props: ItemPanelProps) => {
    const { item } = props;

    return (
        <Flex direction="column" gap={2}>
            <ItemHeading item={item} />

            <Divider />

            <ItemDetails item={item} />

            <Divider />

            <ItemDescription item={item} />
        </Flex>
    );
};

type ItemHeadingProps = {
    item: DetailedWorkItem;
};

export const ItemHeading = (props: ItemHeadingProps) => {
    const { item } = props;

    return (
        <Flex direction={'column'} gap={2}>
            <Text fontSize={24}>{item.name}</Text>

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
                    {item.type}
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

type ItemDetailsProps = {
    item: DetailedWorkItem;
};

export const ItemDetails = (props: ItemDetailsProps) => {
    const { item } = props;

    const assignees = item.assignees;

    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Text fontSize={16}>Details</Text>

            <Flex gap={2} direction={'column'}>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={12}>Created by</Text>
                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar name={`${item.createdBy.firstName} ${item.createdBy.lastName}`} size={'xs'} />
                    </Flex>
                </Flex>

                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={12}>Assigned to</Text>
                    {assignees.length > 0 ? (
                        <>
                            {assignees.length === 1 ? (
                                <Flex
                                    p={1}
                                    rounded={4}
                                    alignItems={'center'}
                                    gap={2}
                                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                >
                                    <Avatar name={`${assignees[0].firstName} ${assignees[0].lastName}`} size={'xs'} />
                                    <Text fontSize={12}>
                                        {assignees[0].firstName} {assignees[0].lastName}
                                    </Text>
                                </Flex>
                            ) : (
                                <AvatarGroup
                                    rounded={4}
                                    p={1}
                                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                >
                                    {assignees.map((a) => (
                                        <Avatar name={`${a.firstName} ${a.lastName}`} size={'xs'} />
                                    ))}
                                </AvatarGroup>
                            )}
                        </>
                    ) : (
                        <Flex
                            p={1}
                            rounded={4}
                            alignItems={'center'}
                            gap={2}
                            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                        >
                            <Avatar
                                name={'Unassigned'}
                                src={
                                    'https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'
                                }
                                size={'xs'}
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

type ItemDescriptionProps = {
    item: DetailedWorkItem;
};

export const ItemDescription = (props: ItemDescriptionProps) => {
    const { item } = props;

    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Text fontSize={16}>Description</Text>

            <Flex>
                <Text fontSize={12}>{item.description}</Text>
            </Flex>
        </Flex>
    );
};
