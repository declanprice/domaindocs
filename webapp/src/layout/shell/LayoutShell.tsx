import { Flex } from '@chakra-ui/react'
import { Toolbar } from './ToolBar.tsx'
import { NavBar } from './NavBar.tsx'
import { Outlet } from 'react-router-dom'

export const LayoutShell = () => {
    return <Flex width={'100%'} height={'100%'} direction={'column'}>
        <Toolbar/>
        <NavBar/>
        <Outlet/>
    </Flex>
}