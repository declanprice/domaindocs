import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';

import { DetailedWorkArea } from '@domaindocs/types';
import { DomainPageParams } from '../../types/DomainPageParams';
import { workApi } from '../../state/api/workApi';
import { WorkAreasPageToolbar } from './WorkAreasPageToolbar';
import { useForm } from 'react-hook-form';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { FcStumbleupon } from 'react-icons/fc';

export const WorkAreasPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: areas, isLoading } = useQuery<DetailedWorkArea[]>({
        queryKey: ['searchWorkAreas', { domainId }],
        queryFn: () => workApi().search(),
    });

    const searchForm = useForm({
        values: {
            name: '',
        },
    });

    if (!areas || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreasPageToolbar />

            <Flex height={'100%'} width={'100%'} overflowY={'auto'} direction={'column'} p={4}>
                <Flex alignItems={'center'}>
                    <InputGroup size={'sm'} maxWidth={'300px'}>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch color="gray.900" />
                        </InputLeftElement>
                        <Input variant={'filled'} placeholder="Search work areas" />
                    </InputGroup>

                    <Box ml={'auto'}>
                        <Button size={'sm'} leftIcon={<BiPlus />}>
                            Work Area
                        </Button>
                    </Box>
                </Flex>

                <Flex mt={4}>
                    {areas.map((area) => (
                        <Button
                            alignItems={'center'}
                            rounded={4}
                            gap={2}
                            py={6}
                            onClick={() => {
                                navigate(`/${domainId}/work-areas/${area.area.id}`);
                            }}
                        >
                            <FcStumbleupon fontSize={24} />
                            <Text fontSize={14}>{area.area.name}</Text>
                        </Button>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
