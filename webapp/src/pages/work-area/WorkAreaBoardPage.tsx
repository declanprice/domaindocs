import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { BiSearch } from 'react-icons/bi';
import React from 'react';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import { useForm } from 'react-hook-form';

export const WorkAreaBoardPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const navigate = useNavigate();

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkBoard', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(domainId, areaId),
    });

    const searchForm = useForm();

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
                        href={`/${domainId}/work-areas/${areaId}`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {board.area.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Text fontSize={18} fontWeight={500}>
                {board.area.name}'s Board
            </Text>

            <Flex alignItems={'center'} gap={2}>
                <Box maxWidth={'180px'}>
                    <FormTextInput
                        name={'name'}
                        control={searchForm.control}
                        placeholder={'Search board'}
                        leftElement={<CiSearch />}
                    />
                </Box>

                <Button>
                    <Text>Status</Text>
                </Button>

                <Button>
                    <Text>Assignees</Text>
                </Button>

                <Button>
                    <Text>Component</Text>
                </Button>
            </Flex>

            <Flex height={'100%'} width={'100%'} overflowY={'auto'} direction={'column'}>
                <Flex gap={4}>
                    {board.statuses.map((status) => (
                        <Flex
                            key={status.id}
                            direction={'column'}
                            gap={2}
                            rounded={4}
                            minHeight={'300px'}
                            minWidth={'250px'}
                            backgroundColor={'lightgray'}
                            p={1}
                        >
                            <Flex p={2}>
                                <Text fontSize={12} color={'gray.900'} display={'flex'}>
                                    {status.name} {status.items.length}
                                </Text>
                            </Flex>

                            <Flex mt={2} direction={'column'} gap={2}>
                                {status.items.map((item) => (
                                    <Box
                                        key={item.id}
                                        border={'1px solid'}
                                        borderColor={'border'}
                                        _hover={{
                                            backgroundColor: 'gray.100',
                                            cursor: 'pointer',
                                        }}
                                        rounded={4}
                                        minHeight={'80px'}
                                        height={'80px'}
                                        maxHeight={'80px'}
                                        backgroundColor={'white'}
                                    ></Box>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
