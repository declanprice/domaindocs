import { useNavigate } from 'react-router-dom'
import { Flex, Heading, Link, Text } from '@chakra-ui/react'

export const WaitForInvitePage = () => {
    const navigate = useNavigate();

    return <Flex height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Flex direction={'column'} alignItems={'end'} gap={6}>
            <Heading>Join existing domain</Heading>
            <Text>Ask your domain admin to send an invite.</Text>
            <Link onClick={() => {
                navigate('/account-setup/new-domain')
            }}>Go back</Link>
        </Flex>
    </Flex>
}