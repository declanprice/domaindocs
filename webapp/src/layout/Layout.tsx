import { Flex, useMediaQuery } from '@chakra-ui/react'
import { Toolbar } from './components/ToolBar.tsx'
import { Outlet } from 'react-router-dom'
import { FullNavBar } from './components/FullNavBar.tsx'
import { useLayoutStore } from '@stores/layout.store.ts'
import { SimpleNavBar } from './components/SimpleNavBar.tsx'

export const Layout = () => {
    const { isFullNavBar, openNavBar, closeNavBar } = useLayoutStore()

    const [isLargeDevice] = useMediaQuery('(min-width: 768px)')

    if (isLargeDevice) {
        openNavBar()
    } else {
        closeNavBar()
    }

    return (
        <Flex width={'100%'} height={'100%'} direction={'column'}>
            <Toolbar />
            <Flex width={'100%'} height={'100%'}>
                {isFullNavBar && <FullNavBar />}
                {!isFullNavBar && <SimpleNavBar />}
                <Outlet />
            </Flex>
        </Flex>
    )
}
