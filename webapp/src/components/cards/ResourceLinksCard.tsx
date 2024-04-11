import { Card, CardBody, CardHeader } from '@chakra-ui/react'

type ResourceLink = {
    linkId: string
    title: string
    subTitle: string
    href: string
    iconUri?: string
}

type ResourceLinksCardProps = {
    links: ResourceLink[]
}

export const ResourceLinksCard = (props: ResourceLinksCardProps) => {
    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                Resource Links
            </CardHeader>
            <CardBody></CardBody>
        </Card>
    )
}
