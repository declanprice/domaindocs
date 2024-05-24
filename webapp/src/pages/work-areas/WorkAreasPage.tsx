import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';

import { IoAddOutline } from 'react-icons/io5';
import { DetailedWorkArea } from '@domaindocs/lib';
import { DomainPageParams } from '../../types/DomainPageParams';
import { workApi } from '../../state/api/workApi';
import { WorkAreasPageToolbar } from './WorkAreasPageToolbar';
import { WorkAreasTable } from './components/WorkAreasTable';

export const WorkAreasPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: areas, isLoading } = useQuery<DetailedWorkArea[]>({
        queryKey: ['searchWorkAreas', { domainId }],
        queryFn: () => workApi().search(),
    });

    if (!areas || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreasPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} width={'100%'} direction={'column'}>
                    <TableToolbar
                        title={`Work Areas (${areas.length})`}
                        actions={
                            <Button
                                fontSize={12}
                                variant={'ghost'}
                                size={'sm'}
                                fontWeight={'regular'}
                                leftIcon={<IoAddOutline />}
                            >
                                New Area
                            </Button>
                        }
                        onSearch={() => {}}
                        onFilterClick={() => {}}
                    />

                    <WorkAreasTable
                        areas={areas}
                        onAreaClick={(area) => {
                            navigate(`/${domainId}/work-areas/${area.area.id}`);
                        }}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};
