import { DefaultError, useMutation } from '@tanstack/react-query';
import { EditContactData, Contact } from '@domaindocs/types';
import { Contacts } from '../../../components/contacts/Contacts';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { apiErrorToast } from '../../../util/toasts';

type SubdomainContactsProps = {
    domainId: string;
    subdomainId: string;
    contacts: Contact[];
};

export const SubdomainContacts = (props: SubdomainContactsProps) => {
    const { domainId, subdomainId, contacts } = props;

    const { mutateAsync: addContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data: EditContactData) => subdomainsApi.addContact(domainId, subdomainId, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data: EditContactData) =>
            subdomainsApi.updateContact(domainId, subdomainId, data?.contactId!, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: removeContact } = useMutation<void, DefaultError, Contact>({
        mutationFn: async (contact: Contact) => {
            return subdomainsApi.removeContact(domainId, subdomainId, contact.contactId);
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
