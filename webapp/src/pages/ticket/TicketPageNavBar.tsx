import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus, LuSettings } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineTicket } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { TicketPageParams } from './TicketPageParams';
import { PiPlugsConnected } from 'react-icons/pi';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';

export const TicketPageNavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const navigate = useNavigate();
    const { domainId, ticketId } = useParams() as TicketPageParams;

    return (
        <Flex
            height={'100%'}
            width={isFullNavBar ? '250px' : '55px'}
            minWidth={isFullNavBar ? '250px' : '55px'}
            background={'lightgray'}
            direction={'column'}
            borderRight={'1px solid'}
            borderColor={'border'}
            p={2}
            align={'center'}
            gap={2}
        >
            <Button
                variant={'ghost'}
                size={'sm'}
                width={'100%'}
                justifyContent={'flex-start'}
                mt={2}
                fontWeight={'300'}
                onClick={() => {
                    navigate(`/${domainId}/ticket-desk/${ticketId}`);
                }}
            >
                <MdArrowBack /> Go back
            </Button>

            <Box divideY={'1px'} />

            <Flex mt={2} px={4} width={'100%'} gap={2} alignItems="center">
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <HiOutlineTicket color={'white'} />
                </Flex>

                <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                    Ticket
                </Text>
            </Flex>

            <Flex
                mt={4}
                width={'100%'}
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                flex={1}
                gap={2}
                display={'flex'}
                flexDir={'column'}
            >
                <NavButton
                    label={'Overview'}
                    icon={<LuListMinus color={'gray.900'} size={18} />}
                    to={`/${domainId}/ticket-desk/${ticketId}/overview`}
                />

                <NavButton
                    icon={<IoIosSearch color={'gray.900'} size={18} />}
                    label={'Fields'}
                    to={`/${domainId}/ticket-desk/${ticketId}/fields`}
                />

                <NavButton
                    icon={<PiPlugsConnected color={'gray.900'} size={18} />}
                    label={'Integrations'}
                    to={`/${domainId}/ticket-desk/${ticketId}/integrations`}
                />

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${domainId}/ticket-desk/${ticketId}/settings`}
                />
            </Flex>
        </Flex>
    );
};
