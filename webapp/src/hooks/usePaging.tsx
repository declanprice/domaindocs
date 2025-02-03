import { useState } from 'react';

type PagingDefaults = {
    pageSize?: number;
};

export const usePaging = (defaults: PagingDefaults = { pageSize: 10 }) => {
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(defaults?.pageSize ?? 10);
    const [page, setPage] = useState(1);

    const getOffset = () => {
        return (page - 1) * pageSize;
    };

    return {
        count,
        page,
        pageSize,
        setCount,
        setPage,
        setPageSize,
        getOffset,
    };
};
