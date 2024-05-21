import { Badge, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { PersonRole } from '@domaindocs/lib';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type PersonRolesListProps = {
    roles: PersonRole[];
    onEdit: () => void;
};

export const PersonRolesList = (props: PersonRolesListProps) => {
    const { roles } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Roles</Text>

                <EditIconButton marginLeft={'auto'} onClick={props.onEdit} />
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
