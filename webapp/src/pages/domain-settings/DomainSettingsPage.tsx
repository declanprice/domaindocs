import { useForm } from 'react-hook-form';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    List,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormInput';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { useQuery } from '@tanstack/react-query';
import { domainsApi } from '../../state/api/domains-api';
import { DomainSettings } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DomainPeopleList } from './components/DomainPeopleList';
import { InvitePersonModal } from '../../components/person/InvitePersonModal';
import { TbDots } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';

export const DomainSettingsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const inviteModal = useDisclosure();

    const { data: domain, isLoading } = useQuery<DomainSettings>({
        queryKey: ['getDomain', { domainId }],
        queryFn: () => domainsApi.getSettings(domainId),
    });

    const form = useForm({
        values: {
            name: domain?.domain.name,
        },
    });

    if (!domain || isLoading) return <LoadingContainer />;

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
                    <Text fontSize={16}>People</Text>
                    <Text fontSize={12}>Manage the people of your domain.</Text>
                </Flex>

                <Flex direction={'column'} width={'100%'} gap={2}>
                    <Flex gap={2}>
                        <InputGroup size={'xs'} maxWidth={'300px'}>
                            <InputLeftElement pointerEvents="none">
                                <BiSearch color="gray.900" />
                            </InputLeftElement>
                            <Input variant={'filled'} placeholder="Search people" />
                        </InputGroup>

                        <Box>
                            <Button
                                size={'xs'}
                                onClick={() => {
                                    inviteModal.onOpen();
                                }}
                            >
                                Invite
                            </Button>
                        </Box>
                    </Flex>

                    <DomainPeopleList people={domain.people} />

                    <InvitePersonModal
                        domainId={domainId}
                        isOpen={inviteModal.isOpen}
                        onClose={inviteModal.onClose}
                        onInviteSent={() => {}}
                    />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting an domain is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'xs'}>
                        Delete Domain
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
