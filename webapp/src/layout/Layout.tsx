import { Flex } from '@chakra-ui/react'
import { HeadingToolbar } from './components/HeadingToolbar.tsx'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar.tsx'
import { useLayoutStore } from '@stores/layout.store.ts'
import { SimpleNavBar } from './components/SimpleNavBar.tsx'

export const Layout = () => {
    const { isFullNavBar } = useLayoutStore()

    return (
        <Flex width={'100%'} height={'100%'} direction={'column'}>
            <HeadingToolbar />
            <Flex width={'100%'} height={'100%'}>
                {isFullNavBar && <NavBar />}
                {!isFullNavBar && <SimpleNavBar />}
                <Outlet />
            </Flex>
        </Flex>
    )
}
