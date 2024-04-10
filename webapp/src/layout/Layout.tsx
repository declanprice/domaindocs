import { Flex } from '@chakra-ui/react'
import { HeadingToolbar } from './HeadingToolbar.tsx'

export const Layout = () => {
    return (
        <Flex direction={'column'} height={'inherit'} overflow={'hidden'}>
            <HeadingToolbar />
            <Flex height={'inherit'}>
                layout
                {/*<NavBar />*/}
                {/*<Outlet />*/}
            </Flex>
        </Flex>
    )
}
