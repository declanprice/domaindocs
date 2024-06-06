import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';

import { DetailedWorkArea } from '@domaindocs/types';
import { DomainPageParams } from '../../types/DomainPageParams';
import { workApi } from '../../state/api/workApi';
import { useForm } from 'react-hook-form';
import { AddWorkAreaModal } from './components/AddWorkAreaModal';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import { TeamsTable } from '../teams/components/TeamsTable';
import { WorkAreasTable } from './components/WorkAreasTable';

export const WorkAreasPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const addAreaModal = useDisclosure();

    const {
        data: areas,
        isLoading,
        refetch,
    } = useQuery<DetailedWorkArea[]>({
        queryKey: ['searchWorkAreas', { domainId }],
        queryFn: () => workApi().search(domainId),
    });

    const searchForm = useForm({
        values: {
            name: '',
        },
    });

    if (!areas || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4}>
            <Flex alignItems={'center'}>
                <Heading variant={'h2'} fontSize={18} fontWeight={400}>
                    Work Areas
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    New Work Area
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for work areas across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Box maxWidth={'180px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search work areas'}
                        leftElement={<CiSearch />}
                    />
                </Box>
            </Flex>

            <WorkAreasTable
                areas={areas}
                onAreaClick={(area) => {
                    navigate(`/${domainId}/work-areas/${area.area.id}`);
                }}
            />

            <AddWorkAreaModal
                domainId={domainId}
                isOpen={addAreaModal.isOpen}
                onClose={addAreaModal.onClose}
                onAddWorkArea={refetch}
            />
        </Flex>
    );
};
