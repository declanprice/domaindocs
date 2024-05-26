import { useParams } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../components/form/FormInput';
import React from 'react';
import { FormPageToolbar } from './FormPageToolbar';
import { FormPageParams } from './FormPageParams';

export const FormSettingsPage = () => {
    const { domainId, formId } = useParams() as FormPageParams;

    const form = useForm({
        values: {
            name: 'Form',
        },
    });

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <FormPageToolbar domainId={domainId} formId={formId} />

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Details</Text>
                    <Text fontSize={12}>Simple form details</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Flex>
                        <FormTextInput name={'name'} control={form.control} label={'Form name'} />
                    </Flex>
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting a form is irreversible, you will lose all data relating to your form.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'sm'}>
                        Delete Form
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
