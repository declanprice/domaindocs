import { useState } from 'react';

export const usePaging = () => {
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    return {
        count,
        page,
        pageSize,
        setCount,
        setPage,
        setPageSize,
    };
};
