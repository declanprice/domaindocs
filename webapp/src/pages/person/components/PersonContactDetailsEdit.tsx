import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { PersonContact, UpdatePersonContactDetailsData } from '@domaindocs/lib';

import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { peopleApi } from '../../../state/api/people-api';
import { FormTextInput } from '../../../components/form/FormInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

type PersonRolesListEditProps = {
    domainId: string;
    userId: string;
    contact: PersonContact | null;
    onSubmit: () => void;
    onCancel: () => void;
};

export const PersonContactDetailsEdit = (props: PersonRolesListEditProps) => {
    const { domainId, userId, contact, onSubmit, onCancel } = props;

    const { mutateAsync: updateContact } = useMutation<void, DefaultError, UpdatePersonContactDetailsData>({
        mutationKey: ['updateContact', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.updateContactDetails(domainId, userId, data);
        },
    });

    const { control, setValue, getValues } = useForm({
        values: {
            workMobile: contact?.workMobile,
            workEmail: contact?.workEmail,
            personalMobile: contact?.personalMobile,
            personalEmail: contact?.personalEmail,
        },
        resolver: classValidatorResolver(UpdatePersonContactDetailsData),
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Contact Details</Text>

                <CloseIconButton marginLeft={'auto'} onClick={props.onCancel} />
                <CheckIconButton
                    onClick={async () => {
                        const data = getValues() as UpdatePersonContactDetailsData;

                        await updateContact(data);

                        onSubmit();
                    }}
                />
            </Flex>

            <SimpleGrid columns={2} spacing={10}>
                <FormTextInput label={'Work Email'} name={'workEmail'} control={control} />
                <FormTextInput label={'Work Mobile'} name={'workMobile'} control={control} />
                <FormTextInput label={'Personal Email'} name={'personalEmail'} control={control} />
                <FormTextInput label={'Personal Mobile'} name={'personalMobile'} control={control} />
            </SimpleGrid>
        </Flex>
    );
};
