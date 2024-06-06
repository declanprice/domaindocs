import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { HiOutlineTicket } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { FaWpforms } from 'react-icons/fa';

export const TicketDeskPageNavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const { activeDomain, setActiveDomain } = useUiStore();
    const navigate = useNavigate();
    if (!activeDomain) return <LoadingContainer />;

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
                leftIcon={<MdArrowBack />}
                width={'100%'}
                justifyContent={'flex-start'}
                mt={2}
                fontWeight={'300'}
                onClick={() => {
                    navigate(`/${activeDomain.domainId}/dashboard`);
                }}
            >
                Go back
            </Button>

            <Divider />

            <Flex mt={2} px={4} width={'100%'} gap={2} alignItems="center">
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <HiOutlineTicket color={'white'} />
                </Flex>

                <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                    Ticket Desk
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
                    label={'Dashboard'}
                    icon={<LuListMinus color={'gray.900'} size={18} />}
                    to={`/${activeDomain.domainId}/ticket-desk/dashboard`}
                />

                <NavButton
                    icon={<IoIosSearch color={'gray.900'} size={18} />}
                    label={'Browse'}
                    to={`/${activeDomain.domainId}/ticket-desk/browse`}
                />

                <NavButton
                    icon={<FaWpforms color={'gray.900'} size={18} />}
                    label={'Your Submissions'}
                    to={`/${activeDomain.domainId}/ticket-desk/submissions`}
                />
            </Flex>
        </Flex>
    );
};
