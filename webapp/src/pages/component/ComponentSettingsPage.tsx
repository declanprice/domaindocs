import { Button, Flex, Text } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useParams } from 'react-router-dom';
import { ComponentPageParams } from './ComponentPageParams';
import { useQuery } from '@tanstack/react-query';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DetailedComponent } from '@domaindocs/types';

export const ComponentSettingsPage = () => {
    const { domainId, componentId } = useParams() as ComponentPageParams;

    const { data: component, isLoading } = useQuery<DetailedComponent>({
        queryKey: ['getComponent', { domainId, componentId }],
        queryFn: () => componentsApi.getComponent(domainId, componentId),
    });

    const form = useForm({
        values: {
            name: component?.component.name,
        },
    });

    if (!component || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16} fontWeight={500}>
                            Details
                        </Text>
                        <Text>Simple Component Details</Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <FormTextInput name={'name'} control={form.control} label={'Component Name'} />
                    </Flex>
                </Flex>

                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16} fontWeight={500}>
                            Danger Area
                        </Text>
                        <Text>
                            Warning deleting a component is irreversible, you will lose all data relating to{' '}
                            {component.component.name}
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <Button backgroundColor={'red'} colorScheme={'red'} size={'sm'}>
                            Delete Component
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
