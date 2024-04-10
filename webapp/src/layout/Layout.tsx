import { Flex } from '@chakra-ui/react'
import { HeadingToolbar } from './HeadingToolbar.tsx'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.tsx'
import { useLayoutStore } from '../state/stores/layout.store.ts'
import { SimpleNavBar } from './SimpleNavBar.tsx'

export const Layout = () => {
    const { isFullNavBar } = useLayoutStore()

    return (
        <Flex direction={'column'} height={'inherit'} overflow={'hidden'}>
            <HeadingToolbar />
            <Flex height={'inherit'}>
                {isFullNavBar && <NavBar />}
                {!isFullNavBar && <SimpleNavBar />}
                <Outlet />
            </Flex>
        </Flex>
    )
}
