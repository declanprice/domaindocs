import { isPersonOwnership, isTeamOwnership, ProjectOwnership as ProjectOwnershipData } from '@domaindocs/types';
import { Flex, List, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';
import React from 'react';
import { PersonOwnershipItem } from '../../../components/ownership/PersonOwnershipItem';
import { TeamOwnershipItem } from '../../../components/ownership/TeamOwnershipItem';

type FormOwnershipProps = {
    domainId: string;
    ownership: ProjectOwnershipData[];
    onAddTeamOwnership: () => void;
    onAddPersonOwnership: () => void;
    onRemoveOwnership: () => void;
};

export const FormOwnership = (props: FormOwnershipProps) => {
    const { domainId, ownership, onAddTeamOwnership, onAddPersonOwnership, onRemoveOwnership } = props;

    const addTeamOwnership = useDisclosure();
    const addPersonOwnership = useDisclosure();

    const { mutateAsync: removeOwnership } = useMutation<void, DefaultError, string>({
        mutationKey: ['removeOwnership', { domainId }],
        mutationFn: async (ownershipId: string) => {
            return projectsApi.removeOwnership(domainId, '1', ownershipId);
        },
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Ownership</Text>

                <Menu>
                    <MenuButton as={AddIconButton} marginLeft={'auto'} />

                    <MenuList>
                        <MenuItem onClick={addPersonOwnership.onOpen}>Person</MenuItem>
                        <MenuItem onClick={addTeamOwnership.onOpen}>Team</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <List spacing={4}>
                {ownership.map((o) => {
                    if (isPersonOwnership(o)) {
                        return (
                            <PersonOwnershipItem
                                ownership={o}
                                onRemove={async () => {
                                    await removeOwnership(o.ownershipId);
                                    onRemoveOwnership();
                                }}
                            />
                        );
                    }

                    if (isTeamOwnership(o)) {
                        return (
                            <TeamOwnershipItem
                                ownership={o}
                                onRemove={async () => {
                                    await removeOwnership(o.ownershipId);
                                    onRemoveOwnership();
                                }}
                            />
                        );
                    }
                })}
            </List>
        </Flex>
    );
};
