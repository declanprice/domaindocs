import { useForm } from 'react-hook-form';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormInput';
import React from 'react';

export const UserSettingsPage = () => {
    const form = useForm({
        values: {
            firstName: 'Declan',
            lastName: 'Price',
            email: 'declanprice1@gmail.com',
        },
    });

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Profile</Text>
                    <Text fontSize={12}>Your personal information</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Avatar name={'Declan Price'} size={'lg'} />

                    <Flex>
                        <FormTextInput name={'firstName'} control={form.control} label={'First Name'} />
                        <FormTextInput ml={2} name={'lastName'} control={form.control} label={'Last Name'} />
                    </Flex>

                    <FormTextInput name={'email'} control={form.control} label={'Email'} />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting an account is irreversible, you will lose all data relating to your account.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'sm'}>
                        Delete Account
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
