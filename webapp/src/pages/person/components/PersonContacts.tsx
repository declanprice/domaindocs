import { Contact, EditContactData } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { peopleApi } from '../../../state/api/people-api';
import { Contacts } from '../../../components/contacts/Contacts';
import { apiErrorToast, apiSuccessToast } from '../../../util/toasts';

type PersonContactsProps = {
    domainId: string;
    userId: string;
    contacts: Contact[];
};

export const PersonContacts = (props: PersonContactsProps) => {
    const { domainId, userId, contacts } = props;

    const { mutateAsync: addContact } = useMutation({
        mutationFn: (data: EditContactData) => peopleApi.addContact(domainId, userId, data),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully added contact'),
    });

    const { mutateAsync: updateContact } = useMutation({
        mutationFn: (data: EditContactData) => peopleApi.updateContact(domainId, userId, data?.contactId!, data),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully updated contact'),
    });

    const { mutateAsync: removeContact } = useMutation({
        mutationFn: async (contact: Contact) => {
            return peopleApi.removeContact(domainId, userId, contact.contactId);
        },
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully removed contact'),
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
