import { useNavigate, useParams } from 'react-router-dom';
import { TicketPageParams } from './TicketPageParams';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineTicket } from 'react-icons/hi';

export const TicketFieldsPage = () => {
    const { domainId, ticketId } = useParams() as TicketPageParams;

    const navigate = useNavigate();

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/${domainId}/people`}
                            fontSize={14}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${domainId}/ticket-desk`);
                            }}
                        >
                            Ticket Centre
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/ticket-desk/${ticketId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Ticket name
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/ticket-desk/${ticketId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Fields
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <HiOutlineTicket color={'white'} />
                </Flex>
                <Text fontSize={18} fontWeight={500}>
                    Ticket name
                </Text>
                fields
            </Flex>
        </Flex>
    );
};
