import { useNavigate, useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
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
import { BacklogEpicNavigator } from './components/backlog/BacklogEpicNavigator';
import { BacklogBoardItems } from './components/backlog/BacklogBoardItems';
import { BacklogItemsList } from './components/backlog/BacklogItemsList';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import React from 'react';
import { useForm } from 'react-hook-form';

export const WorkAreaBacklogPage = () => {
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
                        href={`/${domainId}/work-areas/${areaId}/backlog`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Backlog
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Text fontSize={18} fontWeight={500}>
                {board.area.name}'s Backlog
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

            <Flex flex={1} gap={4}>
                <BacklogEpicNavigator />

                <Flex direction={'column'} width={'100%'} gap={8}>
                    <BacklogBoardItems />

                    <BacklogItemsList />
                </Flex>
            </Flex>
        </Flex>
    );
};
