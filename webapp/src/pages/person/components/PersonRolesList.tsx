import { Badge, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { PersonRole } from '@domaindocs/lib';

type PersonRolesListProps = {
    roles: PersonRole[];
};

export const PersonRolesList = (props: PersonRolesListProps) => {
    const { roles } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Roles</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={1}>
                {roles.map((role: PersonRole) => (
                    <ListItem>
                        <Badge colorScheme={'orange'} fontSize={12}>
                            {role.roleName}
                        </Badge>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
