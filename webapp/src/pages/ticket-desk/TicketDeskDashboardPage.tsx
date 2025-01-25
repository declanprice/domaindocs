import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import React from 'react';

export const TicketDeskDashboardPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    return (
        <Flex width={'100%'} p={8}>
            dashboard
        </Flex>
    );
};
