import { useEffect } from 'react';
import { DetailedWorkItem, WorkItem } from '@domaindocs/types';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { workApi } from '../../../state/api/workApi';
import { WorkAreaPageParams } from '../WorkAreaPageParams';

export const useActiveItem = (items?: WorkItem[]) => {
    const [params, setParams] = useSearchParams();

    const activeItemId = params.get('activeItemId');

    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const {
        data: item,
        isFetching: isItemFetching,
        refetch: fetchItem,
    } = useQuery<DetailedWorkItem>({
        enabled: false,
        queryKey: ['getItem', { domainId, areaId, itemId: activeItemId! }],
        queryFn: () => workApi().getItem(domainId, areaId, activeItemId!),
    });

    const setActiveItemId = (id: string) => {
        setParams({ activeItemId: id });
    };

    useEffect(() => {
        if (activeItemId) {
            fetchItem().then();
        }
    }, [params]);

    useEffect(() => {
        if (!activeItemId && items?.length) {
            setParams({ activeItemId: items[0].id });
        }
    }, [items]);

    return {
        item,
        isItemFetching,
        setActiveItemId,
    };
};
