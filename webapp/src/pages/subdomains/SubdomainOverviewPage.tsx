import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { subdomainApi, SubdomainOverview } from '@state/api/subdomain-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { SummaryCard } from '@components/cards/SummaryCard.tsx'
import { ResourceLinksCard } from '@components/cards/ResourceLinksCard.tsx'
import { ContactsCard } from '@components/cards/ContactsCard.tsx'

export const SubdomainOverviewPage = () => {
    const { subdomainId } = useParams()

    const toast = useToast()

    const {
        data: overview,
        isLoading,
        refetch,
    } = useQuery<SubdomainOverview>({
        queryKey: ['subdomainOverview', { subdomainId }],
        queryFn: () => subdomainApi.getOverviewById(subdomainId as string),
    })

    const { mutate: updateDescription } = useMutation({
        mutationKey: ['updateDescription'],
        mutationFn: async (description: string) => {
            await subdomainApi.updateDescription(
                subdomainId as string,
                description
            )

            await refetch()

            toast({
                position: 'top',
                status: 'success',
                size: 'xs',
                colorScheme: 'gray',
                isClosable: true,
                duration: 3000,
                title: 'Description updated.',
            })
        },
    })

    if (!overview || isLoading) return <LoadingContainer />

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
                onDescriptionChange={updateDescription}
            />

            <ContactsCard contacts={[]} />

            <ResourceLinksCard links={[]} />
        </Flex>
    )
}
