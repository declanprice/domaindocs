import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import {
    Contact,
    ContactsCard,
} from '@components/cards/contacts/ContactsCard.tsx'
import { SelectPeopleDialog } from '@components/dialogs/SelectPeopleDialog.tsx'
import { queryClient } from '@state/query-client.ts'
import { peopleApi } from '@state/api/people-api.ts'

type SubdomainContacts = {
    subdomainName: string
    subdomainId: string
    domainId: string
    subdomainContacts: Contact[]
}

export const SubdomainContacts = (props: SubdomainContacts) => {
    const { domainId, subdomainName, subdomainId, subdomainContacts } = props

    const [searchName, setSearchName] = useState<string | null>(null)

    const {
        data: searchPeopleResult,
        isLoading: isSearchingPeople,
        refetch: searchPeople,
    } = useQuery({
        enabled: false,
        queryKey: ['peopleSearch', { domainId, subdomainId }],
        queryFn: () => peopleApi.searchPeople(domainId, { name: searchName! }),
    })

    const {
        isOpen: isAddContactOpen,
        onOpen: onAddContactOpen,
        onClose: onAddContactClose,
    } = useDisclosure({
        onClose() {
            queryClient
                .resetQueries({
                    queryKey: ['peopleSearch', { domainId, subdomainId }],
                })
                .then()
        },
    })

    useEffect(() => {
        if (searchName === null) return
        searchPeople().then()
    }, [searchName])

    return (
        <>
            <ContactsCard
                contacts={subdomainContacts}
                onAdd={onAddContactOpen}
            />

            <SelectPeopleDialog
                title={`Pin a new contact to ${subdomainName} subdomain.`}
                isOpen={isAddContactOpen}
                onClose={onAddContactClose}
                people={searchPeopleResult}
                onSearch={(name) => {
                    setSearchName(name)
                }}
                isSearching={isSearchingPeople}
                onSelect={(people) => {
                    console.log('selected people', people)
                }}
            />
        </>
    )
}
