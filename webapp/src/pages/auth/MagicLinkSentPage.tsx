import { Flex, Heading, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const MagicLinkSentPage = () => {
    const navigate = useNavigate()

    return (
        <Flex
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                minWidth={300}
                direction="column"
                textAlign="center"
                alignItems="center"
                gap={4}
            >
                <Heading size={'md'}>Magic link on its way</Heading>
                <Text fontSize={12}>We sent a link to your email.</Text>
                <Text fontSize={12}>Click the link to sign in.</Text>
                <Link
                    fontSize={12}
                    onClick={() => {
                        navigate('/auth/sign-in')
                    }}
                >
                    Go back.
                </Link>
            </Flex>
        </Flex>
    )
}
