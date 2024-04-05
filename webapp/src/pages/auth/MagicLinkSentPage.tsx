import { Flex, Heading, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const MagicLinkSentPage = () => {

    const navigate = useNavigate();

    return <Flex height='100%' width='100%' justifyContent='center' alignItems='center'>
            <Flex minWidth={300} direction='column' textAlign='center' alignItems='center'  gap={6}>
                <Heading >Magic link on its way</Heading>
                <Text>We sent a link to your email.</Text>
                <Text>Click the link to sign in.</Text>
                <Link onClick={() => {
                    navigate('../')
                }}>Go back.</Link>
            </Flex>
    </Flex>
}