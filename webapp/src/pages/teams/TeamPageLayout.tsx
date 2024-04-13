import { Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { TeamsPageToolbar } from './TeamsPageToolbar.tsx'

export const TeamPageLayout = () => {
    return (
        <Flex direction="column" width={'100%'}>
            <TeamsPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Outlet />
            </Box>
        </Flex>
    )
}
