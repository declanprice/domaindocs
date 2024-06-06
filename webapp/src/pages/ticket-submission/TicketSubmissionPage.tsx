import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TicketSubmissionPageParams } from './TicketSubmissionPageParams';
import { HiOutlineTicket } from 'react-icons/hi';

export const TicketSubmissionPage = () => {
    const { domainId, ticketId } = useParams() as TicketSubmissionPageParams;

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
                </Breadcrumb>

                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <HiOutlineTicket color={'white'} />
                </Flex>

                <Text fontSize={18} fontWeight={500}>
                    Ticket name
                </Text>

                <Box mt={2}>{/*<PersonAboutMe domainId={domainId} person={person} />*/}</Box>
            </Flex>

            <Flex direction={'column'} width={'350px'} p={4} gap={4}></Flex>
        </Flex>
    );
};
