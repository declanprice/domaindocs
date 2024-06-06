import { useNavigate, useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkArea, WorkItem } from '@domaindocs/types';
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
import { ItemsNavigator } from './components/item/ItemsNavigator';
import { ItemPanel } from './components/item/panel/ItemPanel';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { useActiveItem } from './hooks/useActiveItem';
import { AddItemModalButton } from './components/item/AddItemModal';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import React from 'react';
import { useForm } from 'react-hook-form';

export const WorkAreaItemsPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;
    const navigate = useNavigate();
    const searchForm = useForm();

    const { data: area, isLoading: isAreaLoading } = useQuery<DetailedWorkArea>({
        queryKey: ['getArea', { domainId, areaId }],
        queryFn: () => workApi().get(domainId, areaId),
    });

    const {
        data: items,
        isLoading: isItemsLoading,
        refetch: fetchItems,
    } = useQuery<WorkItem[]>({
        queryKey: ['searchItems', { domainId, areaId }],
        queryFn: () => workApi().searchItems(domainId, areaId),
    });

    const { item, isItemFetching, setActiveItemId, fetchItem } = useActiveItem(items);

    if (!area || !items || isAreaLoading || isItemsLoading) return <LoadingContainer />;

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
                        {area.area.name}'s Board
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem fontSize={14}>
                    <BreadcrumbLink
                        href={`/${domainId}/work-areas/${areaId}/items`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Items
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Text fontSize={18} fontWeight={500}>
                {area.area.name}'s Items
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
                <ItemsNavigator
                    domainId={domainId}
                    areaId={areaId}
                    items={items}
                    activeItemId={item?.id}
                    onItemClick={(item) => {
                        setActiveItemId(item.id);
                    }}
                />

                {isItemFetching ? (
                    <LoadingContainer />
                ) : (
                    <>
                        {item && (
                            <Flex direction={'column'} width={'100%'} gap={8}>
                                <ItemPanel domainId={domainId} areaId={areaId} item={item} />
                            </Flex>
                        )}
                    </>
                )}
            </Flex>
        </Flex>
    );
};
