import { Flex, Stack, Text } from '@chakra-ui/react';
import { PersonContact, PersonTeam } from '@domaindocs/types';
import { GoPeople } from 'react-icons/go';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';

type PersonContactsProps = {
    domainId: string;
    userId: string;
    contacts: PersonContact[];
};

export const PersonContacts = (props: PersonContactsProps) => {
    const { domainId, userId, contacts } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} backgroundColor={'yellow.400'} rounded={6} p={2}>
                    <MdConnectWithoutContact color={'white'} />
                </Flex>

                <Text>Contact</Text>
            </Flex>

            <Stack spacing={3} pl={1}>
                <Flex alignItems={'center'} gap={2}>
                    <MdOutlineEmail fontSize={18} color={'gray.900'} />
                    <Text fontSize={12} fontWeight={300}>
                        declanprice1@gmail.com
                    </Text>
                </Flex>

                <Flex alignItems={'center'} gap={2}>
                    <MdOutlinePhone fontSize={18} color={'gray.900'} />
                    <Text fontSize={12} fontWeight={300}>
                        0756489541
                    </Text>
                </Flex>
            </Stack>
        </Flex>
    );
};
