import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Subdomain, subdomainsApi } from '@state/api/subdomains-api.ts'

export const SubdomainGuard = () => {
    console.log('Running SubdomainGuard')

    const { domainId, subdomainId } = useParams()

    const { data: subdomains, isLoading } = useQuery<Subdomain[]>({
        queryKey: ['domainSubdomains'],
        queryFn: () =>
            subdomainsApi.searchSubdomains({
                domainId: domainId as string,
            }),
    })

    if (isLoading || !subdomains) return null

    if (!subdomains.length) {
        return <Navigate to={`/${domainId}/sd-create`} />
    }

    if (!subdomainId) {
        const firstAvailableSubdomain = subdomains[0]

        return (
            <Navigate
                to={`/${domainId}/sd/${firstAvailableSubdomain.subdomainId}/overview`}
            />
        )
    }

    return <Outlet context={'subdomains-guard'} />
}
