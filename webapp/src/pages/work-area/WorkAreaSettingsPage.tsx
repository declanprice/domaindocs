import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../components/form/FormInput';
import React from 'react';

export const WorkAreaSettingsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const form = useForm({
        values: {
            name: 'Work Area',
        },
    });

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkArea', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(),
    });

    if (!board || isBoardLoading) return <LoadingContainer />;

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <WorkAreaPageToolbar domainId={domainId} area={board.area} />

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Details</Text>
                    <Text fontSize={12}>Simple work area details</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Flex>
                        <FormTextInput name={'name'} control={form.control} label={'Board name'} />
                    </Flex>
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting a work area is irreversible, you will lose all data relating to your work area.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'sm'}>
                        Delete Work Area
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
