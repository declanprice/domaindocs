import { Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { CreateRoleData, PersonRole, Role, UpdatePersonRolesData } from '@domaindocs/lib';

import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { FormCreatableSelectable } from '../../../components/form/FormCreatableSelectable';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { rolesApi } from '../../../state/api/roles-api';

type PersonRolesListEditProps = {
    domainId: string;
    userId: string;
    roles: PersonRole[];
    onSubmit: () => void;
    onCancel: () => void;
};

export const PersonRolesListEdit = (props: PersonRolesListEditProps) => {
    const { domainId, userId, roles, onSubmit, onCancel } = props;

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

    const { mutateAsync: updatePersonRoles } = useMutation<void, DefaultError, UpdatePersonRolesData>({
        mutationKey: ['updatePersonRoles', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.updateRoles(domainId, userId, data);
        },
    });

    const { control, setValue, getValues } = useForm({
        values: {
            roles: props.roles.map((s) => ({
                label: s.roleName,
                value: s.roleId,
            })),
        },
    });

    if (!allRoles || isLoading) return <LoadingContainer />;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Roles</Text>

                <CloseIconButton marginLeft={'auto'} onClick={props.onCancel} />
                <CheckIconButton
                    onClick={async () => {
                        const roleIds = getValues('roles').map((s) => s.value);

                        await updatePersonRoles({
                            roleIds,
                        });

                        onSubmit();
                    }}
                />
            </Flex>

            <FormCreatableSelectable
                name={'roles'}
                control={control}
                options={allRoles.map((s) => ({
                    label: s.name,
                    value: s.roleId,
                }))}
                onCreateOption={async (name) => {
                    const role = await createRole({
                        name,
                    });

                    setValue('roles', [...getValues('roles'), { label: role.name, value: role.roleId }]);

                    queryClient.setQueryData(['searchRoles', { domainId }], [...allRoles, role]);
                }}
            />
        </Flex>
    );
};
