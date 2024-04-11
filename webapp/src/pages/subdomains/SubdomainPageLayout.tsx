import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import {
    SubdomainOption,
    SubdomainSelectMenu,
} from './components/SubdomainSelectMenu.tsx'
import { useState } from 'react'

export const SubdomainPageLayout = () => {
    const [active, setActive] = useState<SubdomainOption>({
        id: '1',
        name: 'Supporting',
    })

    const navigate = useNavigate()

    const location = useLocation()

    return (
        <Flex direction="column" width={'100%'}>
            <PageToolbar
                title={
                    <SubdomainSelectMenu
                        options={[
                            {
                                id: '1',
                                name: 'Supporting',
                            },
                            {
                                id: '2',
                                name: 'Finance',
                            },
                        ]}
                        onSelect={(option) => {
                            setActive(option)

                            navigate(`/subdomains/${option.id}/overview`)
                        }}
                        value={active}
                    />
                }
                tabs={[
                    {
                        label: 'Overview',
                        isActive: location.pathname.includes(
                            `/subdomains/${active.id}/overview`
                        ),
                        onClick: () => {
                            navigate(`/subdomains/${active.id}/overview`)
                        },
                    },
                    {
                        label: 'People',
                        isActive: location.pathname.includes(
                            `/subdomains/${active.id}/people`
                        ),
                        onClick: () => {
                            navigate(`/subdomains/${active.id}/people`)
                        },
                    },
                    {
                        label: 'Teams',
                        isActive: location.pathname.includes(
                            `/subdomains/${active.id}/teams`
                        ),
                        onClick: () => {
                            navigate(`/subdomains/${active.id}/teams`)
                        },
                    },
                    {
                        label: 'Projects',
                        isActive: location.pathname.includes(
                            `/subdomains/${active.id}/projects`
                        ),
                        onClick: () => {
                            navigate(`/subdomains/${active.id}/projects`)
                        },
                    },
                ]}
                actions={[
                    {
                        label: 'New Subdomain',
                        onClick: () => {},
                    },
                ]}
            />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Outlet />
            </Box>
        </Flex>
    )
}
