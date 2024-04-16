import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  List,
  ListItem,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { AddIconButton } from '../../buttons/AddIconButton';

export type Contact = {
  personId: string;
  userId: string;
  firstName: string;
  lastName: string;
  iconUri?: string;
  roleName?: string;
};

type ContactsCardProps = {
  onAdd: () => void;
  contacts: Contact[];
};

export const ContactsCard = (props: ContactsCardProps) => {
  const { contacts, onAdd } = props;

  return (
    <Card boxShadow="xs">
      <CardHeader pb={0} fontSize={16}>
        <Flex>
          <Text flex={1}>Contacts</Text>
          <AddIconButton onClick={onAdd} />
        </Flex>
      </CardHeader>
      <CardBody>
        <List spacing={4}>
          {contacts.map((u) => (
            <ListItem>
              <Flex alignItems="center" width={'100%'}>
                <Avatar
                  size={'xs'}
                  src={u.iconUri}
                  name={`${u.firstName} ${u.lastName}`}
                />

                <Box ml="3">
                  <Text fontWeight="regular" fontSize={14}>
                    {u.firstName} {u.lastName}
                  </Text>

                  {u.roleName && <Text fontSize={12}>{u.roleName}</Text>}
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};
