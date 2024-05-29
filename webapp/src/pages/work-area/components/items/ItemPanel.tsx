import { Avatar, Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { DetailedWorkItem } from '@domaindocs/types';
import { MdOutlineAttachFile } from 'react-icons/md';
import { ChangeItemTypeMenu } from './ChangeItemTypeMenu';
import { ChangeItemParentMenu } from './ChangeItemParentMenu';
import { ItemAssignees } from './ItemAssignees';

type ItemPanelProps = {
    item: DetailedWorkItem;
    domainId: string;
    areaId: string;
};

export const ItemPanel = (props: ItemPanelProps) => {
    const { item, domainId, areaId } = props;

    return (
        <Flex direction="column" gap={2}>
            <ItemHeading domainId={domainId} areaId={areaId} item={item} />

            <Divider />

            <ItemDetails domainId={domainId} areaId={areaId} item={item} />

            <Divider />

            <ItemDescription domainId={domainId} areaId={areaId} item={item} />
        </Flex>
    );
};

type ItemHeadingProps = {
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemHeading = (props: ItemHeadingProps) => {
    const { item, domainId, areaId } = props;

    return (
        <Flex direction={'column'} gap={2}>
            <Text fontSize={24}>{item.name}</Text>

            <Flex gap={2} alignItems={'center'}>
                <ChangeItemParentMenu domainId={domainId} areaId={areaId} item={item} />

                <Divider orientation={'vertical'} height={'20px'} />

                <ChangeItemTypeMenu domainId={domainId} areaId={areaId} item={item} />

                <Divider orientation={'vertical'} height={'20px'} />

                <Button
                    alignItems={'center'}
                    size={'sm'}
                    leftIcon={<MdOutlineAttachFile />}
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
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemDetails = (props: ItemDetailsProps) => {
    const { domainId, areaId, item } = props;

    return (
        <Flex direction={'column'} gap={2} py={2} maxWidth={'500px'}>
            <Text fontSize={16}>Details</Text>

            <Flex gap={2} direction={'column'}>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={12} flex={1}>
                        Created by
                    </Text>

                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        flex={1}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar name={`${item.createdBy.firstName} ${item.createdBy.lastName}`} size={'xs'} />
                        <Text fontSize={12}>
                            {item.createdBy.firstName} {item.createdBy.lastName}
                        </Text>
                    </Flex>
                </Flex>

                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={12} flex={1}>
                        Assigned to
                    </Text>

                    <ItemAssignees domainId={domainId} areaId={areaId} item={item} />
                </Flex>
            </Flex>
        </Flex>
    );
};

type ItemDescriptionProps = {
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemDescription = (props: ItemDescriptionProps) => {
    const { domainId, areaId, item } = props;

    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Text fontSize={16}>Description</Text>

            <Flex>
                <Text fontSize={12}>{item.description}</Text>
            </Flex>
        </Flex>
    );
};
