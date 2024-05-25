import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { PersonContact } from '@domaindocs/types';
import React from 'react';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type PersonContactDetailsProps = {
    contact: PersonContact | null;
    onEdit: () => void;
};

export const PersonContactDetails = (props: PersonContactDetailsProps) => {
    const { contact } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Contact Details</Text>

                <EditIconButton marginLeft={'auto'} onClick={props.onEdit} />
            </Flex>

            <SimpleGrid columns={2} spacing={10}>
                <Stack>
                    <Text fontSize={14}>Work Email</Text>
                    <Text fontSize={12}>{contact?.workEmail || 'N/A'}</Text>
                </Stack>

                <Stack>
                    <Text fontSize={14}>Work Mobile</Text>
                    <Text fontSize={12}>{contact?.workMobile || 'N/A'}</Text>
                </Stack>

                <Stack>
                    <Text fontSize={14}>Personal Email</Text>
                    <Text fontSize={12}>{contact?.personalEmail || 'N/A'}</Text>
                </Stack>

                <Stack>
                    <Text fontSize={14}>Personal Mobile</Text>
                    <Text fontSize={12}>{contact?.personalMobile || 'N/A'}</Text>
                </Stack>
            </SimpleGrid>
        </Flex>
    );
};
