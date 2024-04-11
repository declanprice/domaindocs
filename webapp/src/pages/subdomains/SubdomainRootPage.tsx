// import { PageToolbar } from '@components/page/PageToolbar.tsx'
// import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
// import { Box, Flex } from '@chakra-ui/react'
// import { SubdomainSelectMenu } from './components/SubdomainSelectMenu.tsx'
// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { Subdomain, subdomainApi } from '@state/api/subdomain-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'

export const SubdomainRootPage = () => {
    // const params = useParams() as { domainSlug: string; subdomainSlug: string }
    // const navigate = useNavigate()
    // const location = useLocation()
    // const [activeSubdomain, setActiveSubdomain] = useState<Subdomain | null>(
    //     null
    // )

    // const { data: subdomains, isLoading } = useQuery<Subdomain[]>({
    //     queryKey: ['subdomains'],
    //     queryFn: () =>
    //         subdomainApi.searchSubdomains({
    //             domainSlug: params.domainSlug as string,
    //         }),
    // })

    // if (!subdomains || isLoading || !activeSubdomain) {
    return <LoadingContainer />
    // }

    // return (
    //     <Flex direction="column" width={'100%'}>
    //         <PageToolbar
    //             title={
    //                 subdomains.length && (
    //                     <SubdomainSelectMenu
    //                         options={subdomains}
    //                         onSelect={(option) => {
    //                             setActiveSubdomain(option)
    //                             navigate(`/sd/${option.slug}/overview`)
    //                         }}
    //                         value={activeSubdomain}
    //                     />
    //                 )
    //             }
    //             tabs={[
    //                 {
    //                     label: 'Overview',
    //                     isActive: location.pathname.includes(
    //                         `/sd/${activeSubdomain.slug}/overview`
    //                     ),
    //                     onClick: () => {
    //                         navigate(`/sd/${activeSubdomain.slug}/overview`)
    //                     },
    //                 },
    //                 {
    //                     label: 'People',
    //                     isActive: location.pathname.includes(
    //                         `/sd/${activeSubdomain.slug}/people`
    //                     ),
    //                     onClick: () => {
    //                         navigate(`/sd/${activeSubdomain.slug}/people`)
    //                     },
    //                 },
    //                 {
    //                     label: 'Teams',
    //                     isActive: location.pathname.includes(
    //                         `/sd/${activeSubdomain.slug}/teams`
    //                     ),
    //                     onClick: () => {
    //                         navigate(`/sd/${activeSubdomain.slug}/teams`)
    //                     },
    //                 },
    //                 {
    //                     label: 'Projects',
    //                     isActive: location.pathname.includes(
    //                         `/sd/${activeSubdomain.slug}/projects`
    //                     ),
    //                     onClick: () => {
    //                         navigate(`/sd/${activeSubdomain.slug}/projects`)
    //                     },
    //                 },
    //             ]}
    //             actions={[
    //                 {
    //                     label: 'New Subdomain',
    //                     onClick: () => {},
    //                 },
    //             ]}
    //         />
    //
    //         <Box height={'100%'} width={'100%'} overflowY={'auto'}>
    //             <Outlet />
    //         </Box>
    //     </Flex>
    // )
}
