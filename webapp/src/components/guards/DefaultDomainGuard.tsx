import { Outlet } from 'react-router-dom'
import { domainApi } from '@state/api/domain-api.ts'

export const getDomainsDataLoader = async () => {
    return domainApi.getUserDomains()
}

export const DefaultDomainGuard = () => {
    // const domains = useLoaderData()

    // if (domains) {
    return <Outlet />
    // }

    // return <Navigate to={'/user-setup/create-domain'} />
}
