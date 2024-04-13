import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react'
import { AddIconButton } from '@components/buttons/AddIconButton.tsx'

type ResourceLink = {
    linkId: string
    title: string
    subTitle: string
    href: string
    iconUri?: string
}

type ResourceLinksCardProps = {
    links: ResourceLink[]
    onAddLink: () => void
}

export const ResourceLinksCard = (props: ResourceLinksCardProps) => {
    const { links, onAddLink } = props

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                <Flex>
                    <Text flex={1}>Resources</Text>
                    <AddIconButton onClick={onAddLink} />
                </Flex>
            </CardHeader>
            <CardBody>
                <List>
                    {links.map((link) => (
                        <ListItem>
                            <Flex alignItems="center" width={'100%'} mb={2}>
                                {link.iconUri && (
                                    <Avatar size={'xs'} src={link.iconUri} />
                                )}

                                <Box ml="3">
                                    <Text fontWeight="regular" fontSize={14}>
                                        {link.title}
                                    </Text>

                                    {link.subTitle && (
                                        <Text fontSize={12}>
                                            {link.subTitle}
                                        </Text>
                                    )}
                                </Box>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </CardBody>
        </Card>
    )
}
