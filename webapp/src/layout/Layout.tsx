import { Flex } from '@chakra-ui/react'
import { Toolbar } from './components/ToolBar.tsx'
import { Outlet } from 'react-router-dom'
import { FullNavBar } from './components/FullNavBar.tsx'

export const Layout = () => {
    return (
        <Flex width={'100%'} height={'100%'} direction={'column'}>
            <Toolbar />
            <Flex width={'100%'} height={'100%'}>
                <FullNavBar />
                <Outlet />
            </Flex>
        </Flex>
    )
}
