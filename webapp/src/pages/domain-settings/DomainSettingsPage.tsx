import { useForm } from 'react-hook-form';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormInput';
import React from 'react';

export const DomainSettingsPage = () => {
    const form = useForm({
        values: {
            name: 'Registers of scotland',
        },
    });

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Domain Settings</Text>
                    <Text fontSize={12}>Configure your domain name, and logo.</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Avatar name={'Registers Of Scotland'} size={'lg'} rounded={4} />

                    <FormTextInput name={'name'} control={form.control} label={'Domain name'} />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>SSO Configuration</Text>
                    <Text fontSize={12}>SSO with your own SAML configuration.</Text>
                </Flex>

                <Flex direction={'column'}></Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Subscription</Text>
                    <Text fontSize={12}>Manage your subscription.</Text>
                </Flex>

                <Flex direction={'column'}></Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Users</Text>
                    <Text fontSize={12}>Manage users of your domain.</Text>
                </Flex>

                <Flex direction={'column'}></Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting an domain is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'sm'}>
                        Delete Domain
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
