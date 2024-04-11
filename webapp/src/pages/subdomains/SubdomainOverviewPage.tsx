import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Subdomain, subdomainApi } from '@state/api/subdomain-api.ts'

export const SubdomainOverviewPage = () => {
    const { domainId, subdomainId } = useParams()

    const { data: subdomains, isLoading } = useQuery<Subdomain[]>({
        queryKey: ['subdomainOverview', { subdomainId }],
        queryFn: () =>
            subdomainApi.getById({
                domainId: domainId as string,
            }),
    })

    return <>subdomain overview</>
}
