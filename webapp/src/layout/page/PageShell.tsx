import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const PageShell = (props: PropsWithChildren) => {
    return <Flex height={'100%'} width={'100%'} backgroundColor={'gray.100'}>
        {props.children}
    </Flex>
}