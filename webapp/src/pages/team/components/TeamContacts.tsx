import { Contact, EditContactData } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';
import { Contacts } from '../../../components/contacts/Contacts';
import { apiErrorToast } from '../../../util/toasts';

type TeamContactsProps = {
    domainId: string;
    teamId: string;
    contacts: Contact[];
};

export const TeamContacts = (props: TeamContactsProps) => {
    const { domainId, teamId, contacts } = props;

    const { mutateAsync: addContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data) => teamsApi.createContact(domainId, teamId, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data) => teamsApi.updateContact(domainId, teamId, data?.contactId!, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: removeContact } = useMutation({
        mutationFn: async (contact: Contact) => {
            return teamsApi.deleteContact(domainId, teamId, contact.contactId);
        },
        onError: apiErrorToast,
    });

    return (
        <Contacts
            contacts={contacts}
            onAddContact={addContact}
            onUpdateContact={updateContact}
            onRemoveContact={removeContact}
        />
    );
};
