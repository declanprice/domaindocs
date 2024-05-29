import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ParentWorkItem, UpdateItemParentData, WorkItem, WorkItemType } from '@domaindocs/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { workApi } from '../../../../state/api/workApi';
import { BiEdit } from 'react-icons/bi';
import { LoadingContainer } from '../../../../components/loading/LoadingContainer';
import { ItemTypeIcon } from './ItemTypeIcon';

type ChangeItemParentMenuProps = {
    domainId: string;
    areaId: string;
    item: WorkItem;
};

export const ChangeItemParentMenu = (props: ChangeItemParentMenuProps) => {
    const { domainId, areaId, item } = props;

    const { data: parents, refetch: fetchParents } = useQuery({
        enabled: false,
        queryKey: ['getAvailableParents', { itemId: item.id }],
        queryFn: () => workApi().getAvailableParents(domainId, areaId, item.id),
    });

    const { mutateAsync: updateParent, isPending: isUpdatingParent } = useMutation<void, any, UpdateItemParentData>({
        mutationKey: ['updateParent', { itemId: item.id }],
        mutationFn: (data) => workApi().updateItemParent(domainId, areaId, item.id, data),
    });

    const renderButtonText = () => {
        if (item.parent) {
            return item.parent.name;
        }

        if (item.type === WorkItemType.SUB_TASK) {
            return 'Add Parent';
        }

        return 'Add Epic';
    };

    const renderList = (parents: ParentWorkItem[]) => {
        if (!parents.length) {
            return (
                <Box p={2}>
                    <Text fontSize={12}>No suitable items available.</Text>
                </Box>
            );
        }

        return (
            <>
                {parents.map((p) => (
                    <MenuItem onClick={() => {}}>
                        <ItemTypeIcon type={p.type} />
                        <Text ml={2}>{p.name}</Text>
                    </MenuItem>
                ))}
            </>
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
                onClick={() => {
                    if (!parents) {
                        fetchParents().then();
                    }
                }}
            >
                <Flex alignItems={'center'}>
                    <BiEdit />
                    <Text ml={2}>{renderButtonText()}</Text>
                </Flex>
            </MenuButton>

            <MenuList>{!parents ? <LoadingContainer /> : <>{renderList(parents)}</>}</MenuList>
        </Menu>
    );
};
