import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { subdomainApi, SubdomainOverview } from '@state/api/subdomain-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { SummaryCard } from '@components/cards/SummaryCard.tsx'
import { ResourceLinksCard } from '@components/cards/ResourceLinksCard.tsx'
import { ContactsCard } from '@components/cards/ContactsCard.tsx'

export const SubdomainOverviewPage = () => {
    const { subdomainId } = useParams()

    const { data: overview, isLoading } = useQuery<SubdomainOverview>({
        queryKey: ['subdomainOverview', { subdomainId }],
        queryFn: () => subdomainApi.getOverviewById(subdomainId as string),
    })

    if (!overview || isLoading) return <LoadingContainer />

    console.log('overview', overview)

    return (
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
            <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                Welcome to the{' '}
                <Text display={'inline'} fontWeight={'bold'}>
                    {overview.name}
                </Text>{' '}
                Subdomain
            </Heading>

            <SummaryCard
                peopleCount={overview.summary.peopleCount}
                teamCount={overview.summary.teamCount}
                projectCount={overview.summary.projectCount}
                description={overview.summary.description}
            />

            <ResourceLinksCard links={[]} />

            <ContactsCard contacts={[]} />
        </Flex>
    )
}
