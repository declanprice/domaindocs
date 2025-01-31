import { DefaultError, useMutation } from '@tanstack/react-query';
import { EditContactData, Contact } from '@domaindocs/types';
import { Contacts } from '../../../components/contacts/Contacts';
import { domainsApi } from '../../../state/api/domains-api';

type DomainContactsProps = {
    domainId: string;
    contacts: Contact[];
};

export const DomainContacts = (props: DomainContactsProps) => {
    const { domainId, contacts } = props;

    const { mutateAsync: addContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data: EditContactData) => domainsApi.addContact(domainId, data),
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data: EditContactData) => domainsApi.updateContact(domainId, data?.contactId!, data),
    });

    const { mutateAsync: removeContact } = useMutation<void, DefaultError, Contact>({
        mutationFn: async (contact: Contact) => {
            return domainsApi.removeContact(domainId, contact.contactId);
        },
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
