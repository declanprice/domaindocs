import {
    Text,
    Card,
    CardBody,
    CardHeader,
    Flex,
    List,
    ListItem,
} from '@chakra-ui/react'
import { AddIconButton } from '@components/buttons/AddIconButton.tsx'
import { UserListItem } from '@components/user/UserListItem.tsx'

export type Contact = {
    userId: string
    firstName: string
    lastName: string
    iconUri?: string
    roleName?: string
}

type ContactsCardProps = {
    onAdd: () => void
    contacts: Contact[]
}

export const ContactsCard = (props: ContactsCardProps) => {
    const { contacts, onAdd } = props

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                <Flex>
                    <Text flex={1}>Contacts</Text>
                    <AddIconButton onClick={onAdd} />
                </Flex>
            </CardHeader>
            <CardBody>
                <List>
                    {contacts.map((c) => (
                        <ListItem>
                            <UserListItem
                                firstName={c.firstName}
                                lastName={c.lastName}
                                roleName={c.roleName}
                                iconUri={c.iconUri}
                                key={c.userId}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardBody>
        </Card>
    )
}
