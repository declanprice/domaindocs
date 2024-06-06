import { useNavigate, useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../components/form/FormTextInput';
import React from 'react';

export const WorkAreaSettingsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;
    const navigate = useNavigate();

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkArea', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(domainId, areaId),
    });

    const form = useForm({
        values: {
            name: board?.area.name,
        },
    });

    if (!board || isBoardLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'} p={8} gap={4}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href={`/${domainId}/people`}
                        fontSize={14}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/work-areas`);
                        }}
                    >
                        Work Areas
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem fontSize={14}>
                    <BreadcrumbLink
                        href={`/${domainId}/work-areas/${areaId}/board`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/work-areas/${areaId}/board`);
                        }}
                    >
                        {board.area.name}'s Board
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem fontSize={14}>
                    <BreadcrumbLink
                        href={`/${domainId}/work-areas/${areaId}/settings`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Settings
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Text fontSize={18} fontWeight={500}>
                {board.area.name}'s Settings
            </Text>

            <Flex mt={4} borderBottom={'1px solid'} borderColor={'border'} pb={30}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Details</Text>
                    <Text fontSize={12}>Simple work area details</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Flex>
                        <FormTextInput name={'name'} control={form.control} label={'Area name'} />
                    </Flex>
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting a work area is irreversible, you will lose all data relating to your work area.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} backgroundColor={'red'} size={'sm'}>
                        Delete Work Area
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
