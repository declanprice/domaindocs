import { EditPersonRoleData, CreateRoleData, DetailedPerson, PersonRole, Role } from '@domaindocs/types';
import { Box, Button, ButtonGroup, Flex, Portal, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { GrWorkshop } from 'react-icons/gr';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from '../../../components/form/FormCheckbox';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { rolesApi } from '../../../state/api/roles-api';
import { FormCreateSelect } from '../../../components/form/FormCreateSelect';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import {
    PopoverRoot,
    PopoverTrigger,
    PopoverContent,
    PopoverFooter,
    PopoverBody,
} from '../../../components/ui/popover';
import { apiErrorToast, apiSuccessToast } from '../../../util/toasts';

type PersonRolesProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonRoles = (props: PersonRolesProps) => {
    const { domainId, person } = props;

    const roles = person.roles.sort((r) => (r.isPrimary ? 0 : 1));

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                    <GrWorkshop color={'white'} />
                </Flex>

                <Text ml={4} fontSize={18}>
                    Roles
                </Text>

                <Box ml={'auto'}>
                    <PersonRoleForm domainId={domainId} userId={person.person.userId}>
                        <AddIconButton />
                    </PersonRoleForm>
                </Box>
            </Flex>

            <ul>
                {roles.map((role) => (
                    <>
                        <PersonRoleListItem domainId={domainId} userId={person.person.userId} role={role} />

                        <Box mt={2} />
                    </>
                ))}
            </ul>
        </Flex>
    );
};

type PersonRoleListItemProps = {
    domainId: string;
    userId: string;
    role: PersonRole;
};

export const PersonRoleListItem = (props: PersonRoleListItemProps) => {
    const { domainId, userId, role } = props;

    const removeDialog = useDisclosure();

    const editPopover = useDisclosure();

    const [isHovering, setIsHovering] = useState(false);

    const { mutateAsync: removePersonRole } = useMutation<void, DefaultError>({
        mutationFn: async () => {
            return peopleApi.removeRole(domainId, userId, role.roleId);
        },
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully removed role'),
    });

    return (
        <li key={role.roleId} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Flex alignItems={'center'}>
                <Flex direction={'column'}>
                    <Text fontSize={14} fontWeight={300}>
                        {role.isPrimary ? 'Primary' : 'Secondary'}
                    </Text>

                    <Text fontSize={14} fontWeight={400}>
                        {role.roleName}
                    </Text>
                </Flex>

                <ButtonGroup visibility={isHovering ? 'visible' : 'hidden'} gap={1} ml={'auto'}>
                    <PersonRoleForm domainId={domainId} userId={userId} role={role}>
                        <EditIconButton variant={'ghost'} onClick={editPopover.onOpen} />
                    </PersonRoleForm>

                    <CloseIconButton variant={'ghost'} onClick={removeDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={removeDialog.open}
                header={'Remove role?'}
                onConfirm={removePersonRole}
                onClose={removeDialog.onClose}
            />
        </li>
    );
};

type PersonRoleFormProps = {
    domainId: string;
    userId: string;
    role?: PersonRole;
} & PropsWithChildren;

export const PersonRoleForm = (props: PersonRoleFormProps) => {
    const { domainId, userId, role } = props;

    const menu = useDisclosure();

    const { data: allRoles, isLoading } = useQuery<Role[]>({
        queryKey: ['searchRoles', { domainId }],
        queryFn: () => rolesApi.search(domainId, {}),
    });

    const { mutateAsync: createRole } = useMutation<Role, DefaultError, CreateRoleData>({
        mutationKey: ['createRole', { domainId }],
        mutationFn: async (data) => {
            return rolesApi.create(domainId, data);
        },
    });

    const { mutateAsync: createPersonRole } = useMutation<void, DefaultError, EditPersonRoleData>({
        mutationKey: ['createPersonRole', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.createRole(domainId, userId, data);
        },
    });

    const { mutateAsync: updatePersonRole } = useMutation<void, DefaultError, EditPersonRoleData>({
        mutationKey: ['updatePersonRole', { domainId, userId, roleId: role?.roleId }],
        mutationFn: async (data) => {
            return peopleApi.updateRole(domainId, userId, role?.roleId!, data);
        },
    });

    const form = useForm<EditPersonRoleData>({
        values: {
            roleId: role ? role.roleId : '',
            isPrimary: role ? role.isPrimary : false,
        },
        resolver: classValidatorResolver(EditPersonRoleData),
    });

    const close = () => {
        form.reset();
        menu.onClose();
    };

    const submit = async (data: EditPersonRoleData) => {
        if (role) {
            await updatePersonRole(data);
        } else {
            await createPersonRole(data);
        }
        close();
    };

    if (!allRoles || isLoading) return null;

    return (
        <PopoverRoot
            open={menu.open}
            onOpenChange={(details: { open: boolean }) => {
                if (details.open) {
                    menu.onOpen();
                } else {
                    menu.onClose();
                }
            }}
        >
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal>
                <PopoverContent mr={2} backgroundColor={'white'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack gap={4}>
                                <FormCreateSelect
                                    label={'Role'}
                                    name={'roleId'}
                                    control={form.control}
                                    options={allRoles.map((s) => ({
                                        label: s.name,
                                        value: s.roleId,
                                    }))}
                                    isMulti={false}
                                    onCreateOption={async (name) => {
                                        const role = await createRole({
                                            name,
                                        });

                                        form.setValue('roleId', role.roleId);

                                        queryClient.setQueryData(['searchRoles', { domainId }], [...allRoles, role]);
                                    }}
                                />

                                <FormCheckbox label={'Is Primary Role'} name={'isPrimary'} control={form.control} />
                            </Stack>
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                    Cancel
                                </Button>

                                <Button type={'submit'} loading={form.formState.isSubmitting}>
                                    {role ? 'Save' : 'Add'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </PopoverRoot>
    );
};
