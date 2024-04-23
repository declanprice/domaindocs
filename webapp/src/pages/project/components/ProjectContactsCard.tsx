import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../../state/api/people-api';
import { queryClient } from '../../../state/query-client';
import { SelectPeopleDialog } from '../../../components/person/SelectPeopleDialog';
import { ContactsCard } from '../../../components/contact/ContactsCard';
import { ProjectContact, SubdomainContactDto } from '@domaindocs/lib';
import { projectsApi } from '../../../state/api/projects-api';

type ProjectContactsCard = {
    projectId: string;
    projectName: string;
    domainId: string;
    contacts: ProjectContact[];
    onAddContacts: (contacts: ProjectContact[]) => Promise<void>;
};

export const ProjectContactsCard = (props: ProjectContactsCard) => {
    const { domainId, projectId, projectName, contacts, onAddContacts } = props;

    const [searchName, setSearchName] = useState<string | null>(null);

    const {
        data: searchPeopleResult,
        isLoading: isSearchingPeople,
        refetch: searchPeople,
    } = useQuery({
        enabled: false,
        queryKey: ['searchPeople', { domainId, projectId }],
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
                    queryKey: ['searchPeople', { domainId, projectId }],
                })
                .then();
        },
    });

    const { mutateAsync: addContacts } = useMutation({
        mutationKey: ['addProjectContacts', { domainId, projectId }],
        mutationFn: async (contacts: SubdomainContactDto[]) => {
            await projectsApi.addContacts(domainId, projectId, {
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
            <ContactsCard contacts={contacts} onAdd={onAddContactOpen} />

            <SelectPeopleDialog
                title={`Pin a new contact to ${projectName} project.`}
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
