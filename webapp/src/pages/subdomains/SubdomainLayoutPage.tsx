import { Outlet } from 'react-router-dom'
import { SubdomainPageToolbar } from './SubdomainPageToolbar.tsx'
import { Box, Flex } from '@chakra-ui/react'

export const SubdomainLayoutPage = () => {
    return (
        <Flex direction="column" width={'100%'}>
            <SubdomainPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Outlet />
            </Box>
        </Flex>
    )
}
