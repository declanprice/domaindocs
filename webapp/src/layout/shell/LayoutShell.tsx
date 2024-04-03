import { Flex } from '@chakra-ui/react'
import { Toolbar } from './ToolBar.tsx'
import { NavBar } from './NavBar.tsx'
import { PropsWithChildren } from 'react'

export const LayoutShell = (props: PropsWithChildren) => {
    return <Flex width={'100%'} height={'100%'} direction={'column'}>
        <Toolbar/>
        <NavBar/>
        {props.children}
    </Flex>
}