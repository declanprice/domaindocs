import { isPersonOwnership, isTeamOwnership, ProjectOwnership as ProjectOwnershipData } from '@domaindocs/types';
import { Flex, List, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';
import { AddTeamOwnership } from './AddTeamOwnership';
import { AddPersonOwnership } from './AddPersonOwnership';
import React from 'react';
import { TeamOwnershipItem } from '../../../components/ownership/TeamOwnershipItem';
import { PersonOwnershipItem } from '../../../components/ownership/PersonOwnershipItem';

type ProjectOwnershipProps = {
    domainId: string;
    projectId: string;
    projectName: string;
    ownership: ProjectOwnershipData[];
    onAddTeamOwnership: () => void;
    onAddPersonOwnership: () => void;
    onRemoveOwnership: () => void;
};

export const ProjectOwnershipList = (props: ProjectOwnershipProps) => {
    const { domainId, projectId, projectName, ownership, onAddTeamOwnership, onAddPersonOwnership, onRemoveOwnership } =
        props;

    const addTeamOwnership = useDisclosure();
    const addPersonOwnership = useDisclosure();

    const { mutateAsync: removeOwnership } = useMutation<void, DefaultError, string>({
        mutationKey: ['removeProjectOwnership', { domainId, projectId }],
        mutationFn: async (ownershipId: string) => {
            return projectsApi.removeOwnership(domainId, projectId, ownershipId);
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

            <AddTeamOwnership
                isOpen={addTeamOwnership.isOpen}
                domainId={domainId}
                projectId={projectId}
                ownership={ownership}
                onClose={addTeamOwnership.onClose}
                onSubmit={onAddTeamOwnership}
            />

            <AddPersonOwnership
                isOpen={addPersonOwnership.isOpen}
                domainId={domainId}
                projectId={projectId}
                ownership={ownership}
                onClose={addPersonOwnership.onClose}
                onSubmit={onAddPersonOwnership}
            />
        </Flex>
    );
};
