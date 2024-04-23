import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { peopleApi } from '../../../state/api/people-api';
import { queryClient } from '../../../state/query-client';
import { SelectPeopleDialog } from '../../../components/person/SelectPeopleDialog';
import { ContactsCard } from '../../../components/contact/ContactsCard';
import { SubdomainContactDto } from '@domaindocs/lib';

type SubdomainContacts = {
    subdomainName: string;
    subdomainId: string;
    domainId: string;
    subdomainContacts: SubdomainContactDto[];
    onAddContacts: (contacts: SubdomainContactDto[]) => Promise<void>;
};

export const SubdomainContacts = (props: SubdomainContacts) => {
    const { domainId, subdomainName, subdomainId, subdomainContacts, onAddContacts } = props;

    const [searchName, setSearchName] = useState<string | null>(null);

    const {
        data: searchPeopleResult,
        isLoading: isSearchingPeople,
        refetch: searchPeople,
    } = useQuery({
        enabled: false,
        queryKey: ['peopleSearch', { domainId, subdomainId }],
        queryFn: () => peopleApi.searchPeople(domainId, { name: searchName! }),
    });

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
                .then();
        },
    });

    const { mutateAsync: addContacts } = useMutation({
        mutationKey: ['addContacts', { domainId, subdomainId }],
        mutationFn: async (contacts: SubdomainContactDto[]) => {
            await subdomainsApi.addContacts(domainId, subdomainId, {
                personIds: contacts.map((c) => c.personId),
            });
            await onAddContacts(contacts);
        },
    });

    useEffect(() => {
        if (searchName == null) return;
        searchPeople().then();
    }, [searchName]);

    return (
        <>
            <ContactsCard contacts={subdomainContacts} onAdd={onAddContactOpen} />

            <SelectPeopleDialog
                title={`Pin a new contact to ${subdomainName} subdomain.`}
                isOpen={isAddContactOpen}
                onClose={onAddContactClose}
                people={searchPeopleResult?.map((s) => s.person)}
                onSearch={(name) => {
                    setSearchName(name);
                }}
                isSearching={isSearchingPeople}
                onSelect={async (people) => {
                    await addContacts(people);
                }}
            />
        </>
    );
};
