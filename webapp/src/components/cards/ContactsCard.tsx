import {
    Avatar,
    Text,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    ListItem,
    List,
} from '@chakra-ui/react'

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
    const item = () => (
        <Flex alignItems="center">
            <Avatar size={'sm'} src="https://bit.ly/sage-adebayo" />
            <Box ml="3">
                <Text fontWeight="regular" fontSize={14}>
                    Declan Price
                </Text>
                <Text fontSize={12}>Software Developer</Text>
            </Box>
        </Flex>
    )

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                Contacts
            </CardHeader>
            <CardBody>
                <List>
                    <ListItem mb={2}>{item()}</ListItem>
                    <ListItem mb={2}>{item()}</ListItem>
                </List>
            </CardBody>
        </Card>
    )
}
