import { Contact, EditContactData } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';
import { Contacts } from '../../../components/contacts/Contacts';
import { apiErrorToast } from '../../../util/toasts';
import { componentsApi } from '../../../state/api/components-api';

type ComponentContactsProps = {
    domainId: string;
    componentId: string;
    contacts: Contact[];
};

export const ComponentContacts = (props: ComponentContactsProps) => {
    const { domainId, componentId, contacts } = props;

    const { mutateAsync: addContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data) => componentsApi.createContact(domainId, componentId, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditContactData>({
        mutationFn: (data) => componentsApi.updateContact(domainId, componentId, data?.contactId!, data),
        onError: apiErrorToast,
    });

    const { mutateAsync: removeContact } = useMutation({
        mutationFn: async (contact: Contact) => {
            return componentsApi.removeContact(domainId, componentId, contact.contactId);
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
