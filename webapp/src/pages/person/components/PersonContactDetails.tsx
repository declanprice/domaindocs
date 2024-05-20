import { Flex, Stack, Text } from '@chakra-ui/react';
import { PersonContact } from '@domaindocs/lib';
import React from 'react';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type PersonContactDetailsProps = {
    contact: PersonContact | null;
};

export const PersonContactDetails = (props: PersonContactDetailsProps) => {
    const { contact } = props;

    const hasWorkContact = contact && (contact.workMobile || contact.workEmail);

    const hasPersonalContact = contact && (contact.personalMobile || contact.personalEmail);

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Contact Details</Text>

                <EditIconButton marginLeft={'auto'} />
            </Flex>

            <Stack spacing={4}>
                {hasWorkContact && (
                    <Flex>
                        {contact.workEmail && (
                            <Stack flex={1}>
                                <Text fontSize={14}>Work Email</Text>
                                <Text fontSize={12}>{contact.workEmail}</Text>
                            </Stack>
                        )}

                        {contact.workMobile && (
                            <Stack flex={1}>
                                <Text fontSize={14}>Work Mobile</Text>
                                <Text fontSize={12}>{contact.workMobile}</Text>
                            </Stack>
                        )}
                    </Flex>
                )}

                {hasPersonalContact && (
                    <Flex>
                        {contact.personalEmail && (
                            <Stack flex={1}>
                                <Text fontSize={14}>Personal Email</Text>
                                <Text fontSize={12}>{contact.personalEmail}</Text>
                            </Stack>
                        )}

                        {contact.personalMobile && (
                            <Stack flex={1}>
                                <Text fontSize={14}>Personal Mobile</Text>
                                <Text fontSize={12}>{contact.personalMobile}</Text>
                            </Stack>
                        )}
                    </Flex>
                )}
            </Stack>
        </Flex>
    );
};
