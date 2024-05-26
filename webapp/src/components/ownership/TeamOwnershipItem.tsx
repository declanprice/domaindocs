import { ProjectPersonOwnership, ProjectTeamOwnership } from '@domaindocs/types';
import { useHover } from '@uidotdev/usehooks';
import { Box, Flex, IconButton, ListItem, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { TbDots } from 'react-icons/tb';
import { ConfirmDialog } from '../dialogs/ConfirmDialog';
import { TeamAvatar } from '../team/TeamAvatar';
import React from 'react';

export const TeamOwnershipItem = (props: {
    ownership: ProjectTeamOwnership;
    onRemove: (ownership: ProjectTeamOwnership) => void;
}) => {
    const { ownership, onRemove } = props;

    const [ref, hovering] = useHover();

    const removeOwnershipDialog = useDisclosure();

    return (
        <ListItem key={ownership.teamId} ref={ref} p={1} rounded={6}>
            <Flex alignItems={'center'}>
                <TeamAvatar name={ownership.name} subTitle={ownership.description} small />

                <Box flex={1}></Box>

                {hovering && (
                    <Menu>
                        <MenuButton size={'xs'} as={IconButton} icon={<TbDots />} />

                        <MenuList>
                            <MenuItem onClick={removeOwnershipDialog.onOpen}>Remove</MenuItem>
                        </MenuList>
                    </Menu>
                )}

                <ConfirmDialog
                    isOpen={removeOwnershipDialog.isOpen}
                    header={'Remove Ownership'}
                    onConfirm={() => onRemove(ownership)}
                    onCancel={removeOwnershipDialog.onClose}
                />
            </Flex>
        </ListItem>
    );
};
