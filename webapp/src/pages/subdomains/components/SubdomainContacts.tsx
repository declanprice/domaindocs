import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ContactsCard } from '@components/cards/contacts/ContactsCard.tsx'
import { SelectPeopleDialog } from '@components/person/SelectPeopleDialog.tsx'
import { queryClient } from '@state/query-client.ts'
import { peopleApi } from '@state/api/people-api.ts'

import { SubdomainContact, subdomainsApi } from '@state/api/subdomains-api.ts'

type SubdomainContacts = {
    subdomainName: string
    subdomainId: string
    domainId: string
    subdomainContacts: SubdomainContact[]
    onAddContacts: (contacts: SubdomainContact[]) => Promise<void>
}

export const SubdomainContacts = (props: SubdomainContacts) => {
    const {
        domainId,
        subdomainName,
        subdomainId,
        subdomainContacts,
        onAddContacts,
    } = props

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

    const { mutateAsync: addContacts } = useMutation({
        mutationKey: ['addContacts', { domainId, subdomainId }],
        mutationFn: async (contacts: SubdomainContact[]) => {
            await subdomainsApi.addContacts(domainId, subdomainId, contacts)
            await onAddContacts(contacts)
        },
    })

    useEffect(() => {
        if (searchName == null) return
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
                people={searchPeopleResult?.map((s) => s.person)}
                onSearch={(name) => {
                    setSearchName(name)
                }}
                isSearching={isSearchingPeople}
                onSelect={async (people) => {
                    await addContacts(people)
                }}
            />
        </>
    )
}
