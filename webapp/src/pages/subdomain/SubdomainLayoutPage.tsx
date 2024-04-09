import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import { TbCategory2 } from 'react-icons/tb'

export const SubdomainLayoutPage = () => {
    return (
        <Flex direction="column" height={'100%'} width={'100%'}>
            <PageToolbar
                icon={<TbCategory2 color={'gray.900'} size={14} />}
                title={'Subdomain'}
                tabs={[]}
                actions={[]}
            />
            <Outlet />
        </Flex>
    )
}
