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
    const { links } = props

    // const item = () => (
    //     <Flex>
    //         <Avatar src="https://bit.ly/sage-adebayo" />
    //         <Box ml="3">
    //             <Text fontWeight="bold">
    //                 Segun Adebayo
    //                 <Badge ml="1" colorScheme="green">
    //                     New
    //                 </Badge>
    //             </Text>
    //             <Text fontSize="sm">UI Engineer</Text>
    //         </Box>
    //     </Flex>
    // )

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                Resources
            </CardHeader>
            <CardBody></CardBody>
        </Card>
    )
}
