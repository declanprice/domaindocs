import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '@state/api/user-api.ts'
import {
    Contact,
    ContactsCard,
} from '@components/cards/contacts/ContactsCard.tsx'
import { SelectUsersDialog } from '@components/dialogs/SelectUsersDialog.tsx'
import { queryClient } from '@state/query-client.ts'

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
        data: searchUsersData,
        isLoading: isSearchingUsers,
        refetch: searchUsers,
    } = useQuery({
        enabled: false,
        queryKey: ['usersSearch', { subdomainId }],
        queryFn: () => userApi.searchUsers({ domainId, name: searchName! }),
    })

    const {
        isOpen: isAddContactOpen,
        onOpen: onAddContactOpen,
        onClose: onAddContactClose,
    } = useDisclosure({
        onClose() {
            queryClient
                .resetQueries({ queryKey: ['usersSearch', { subdomainId }] })
                .then()
        },
    })

    useEffect(() => {
        if (searchName === null) return
        searchUsers().then()
    }, [searchName])

    return (
        <>
            <ContactsCard
                contacts={subdomainContacts}
                onAdd={onAddContactOpen}
            />

            <SelectUsersDialog
                title={`Pin a new contact to ${subdomainName} subdomain.`}
                isOpen={isAddContactOpen}
                onClose={onAddContactClose}
                users={searchUsersData}
                onSearch={(name) => {
                    setSearchName(name)
                }}
                isSearching={isSearchingUsers}
                onSelect={(contacts) => {
                    console.log(contacts)
                }}
            />
        </>
    )
}
