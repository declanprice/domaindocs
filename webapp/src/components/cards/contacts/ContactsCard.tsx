import {
    Avatar,
    Text,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    List,
} from '@chakra-ui/react'

import { AddIconButton } from '@components/buttons/AddIconButton.tsx'

type Contact = {
    userId: string
    firstName: string
    lastName: string
    role?: string
    avatarUri?: string
}

type ContactsCardProps = {
    onAdd: () => void
    contacts: Contact[]
}

export const ContactsCard = (props: ContactsCardProps) => {
    const { contacts, onAdd } = props

    const item = (contact: Contact) => (
        <Flex alignItems="center">
            <Avatar
                size={'sm'}
                src="https://bit.ly/sage-adebayo"
                title={contact.firstName}
            />
            <Box ml="3">
                <Text fontWeight="regular" fontSize={14}>
                    {contact.firstName} {contact.lastName}
                </Text>
                <Text fontSize={12}>{contact.role}</Text>
            </Box>
        </Flex>
    )

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                <Flex>
                    <Text flex={1}>Contacts</Text>
                    <AddIconButton onClick={onAdd} />
                </Flex>
            </CardHeader>
            <CardBody>
                <List>{contacts.map((c) => item(c))}</List>
            </CardBody>
        </Card>
    )
}
