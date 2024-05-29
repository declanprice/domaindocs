import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { UpdateItemTypeData, WorkItem, WorkItemType } from '@domaindocs/types';
import { ItemTypeIcon } from './ItemTypeIcon';
import { useMutation } from '@tanstack/react-query';
import { workApi } from '../../../../state/api/workApi';

type ChangeItemTypeMenuProps = {
    domainId: string;
    areaId: string;
    item: WorkItem;
};

export const ChangeItemTypeMenu = (props: ChangeItemTypeMenuProps) => {
    const { domainId, areaId, item } = props;

    const { mutateAsync, isPending } = useMutation<void, any, UpdateItemTypeData>({
        mutationKey: ['updateItemType', { itemId: item.id }],
        mutationFn: (data) => workApi().updateItemType(domainId, areaId, item.id, data),
    });

    const renderTypes = () => {
        if (item.type === WorkItemType.EPIC) {
            return null;
        }

        if (item.type === WorkItemType.SUB_TASK) {
            return null;
        }

        return (
            <MenuList>
                <MenuItem
                    onClick={async () => {
                        if (item.type !== WorkItemType.STORY) {
                            await mutateAsync({ type: WorkItemType.STORY });
                        }
                    }}
                >
                    <ItemTypeIcon type={WorkItemType.STORY} />
                    <Text ml={2}>Story</Text>
                </MenuItem>

                <MenuItem
                    onClick={async () => {
                        if (item.type !== WorkItemType.TASK) {
                            await mutateAsync({ type: WorkItemType.TASK });
                        }
                    }}
                >
                    <ItemTypeIcon type={WorkItemType.TASK} />
                    <Text ml={2}>Task</Text>
                </MenuItem>

                <MenuItem
                    onClick={async () => {
                        if (item.type !== WorkItemType.BUG) {
                            await mutateAsync({ type: WorkItemType.BUG });
                        }
                    }}
                >
                    <ItemTypeIcon type={WorkItemType.BUG} />
                    <Text ml={2}>Bug</Text>
                </MenuItem>
            </MenuList>
        );
    };

    return (
        <Menu>
            <MenuButton
                as={Button}
                alignItems={'center'}
                size={'sm'}
                variant={'ghost'}
                fontWeight={'normal'}
                isLoading={isPending}
            >
                <Flex alignItems={'center'}>
                    <ItemTypeIcon type={item.type} />
                    <Text ml={2}>{item.type}</Text>
                </Flex>
            </MenuButton>

            {renderTypes()}
        </Menu>
    );
};
