import { Flex } from '@chakra-ui/react'
import { HeadingToolbar } from './HeadingToolbar.tsx'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <Flex direction={'column'} height={'inherit'} overflow={'hidden'}>
            <HeadingToolbar />
            <Flex height={'inherit'}>
                {/*<NavBar />*/}
                <Outlet />
            </Flex>
        </Flex>
    )
}
