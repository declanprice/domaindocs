import { Card, CardBody, CardHeader } from '@chakra-ui/react'

type Contact = {
    userId: string
    firstName: string
    lastName: string
    role?: string
    avatarUri?: string
}

type ContactsCardProps = {
    contacts: Contact[]
}

export const ContactsCard = (props: ContactsCardProps) => {
    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                Contacts
            </CardHeader>
            <CardBody></CardBody>
        </Card>
    )
}
