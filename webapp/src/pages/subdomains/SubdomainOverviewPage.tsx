import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { subdomainApi, SubdomainOverview } from '@state/api/subdomain-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'

export const SubdomainOverviewPage = () => {
    const { subdomainId } = useParams()

    const { data: overview, isLoading } = useQuery<SubdomainOverview>({
        queryKey: ['subdomainOverview', { subdomainId }],
        queryFn: () => subdomainApi.getOverviewById(subdomainId as string),
    })

    if (!overview || isLoading) return <LoadingContainer />

    console.log('overview', overview)

    return <>subdomain overview</>
}
