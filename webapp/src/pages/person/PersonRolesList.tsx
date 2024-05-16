import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../components/buttons/AddIconButton';
import { PersonRole } from '@domaindocs/lib';

type PersonRolesListProps = {
    roles: PersonRole[];
};

export const PersonRolesList = (props: PersonRolesListProps) => {
    const { roles } = props;

    return (
        <Flex direction={'column'} py={2} gap={2}>
            <Flex>
                <Text fontSize={18}>Roles</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={1}>
                {roles.map((role: PersonRole) => (
                    <ListItem>
                        <Text fontSize={14}>{role.roleName}</Text>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
