import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineTicket } from 'react-icons/hi';
import { TicketSubmissionPageParams } from './TicketSubmissionPageParams';

export const TicketSubmissionPageNavBar = () => {
    const { isFullNavBar } = useUiStore();
    const navigate = useNavigate();
    const { domainId, ticketId, submissionId } = useParams() as TicketSubmissionPageParams;

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
                    navigate(`/${domainId}/ticket-desk/${ticketId}/overview`);
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
                    Ticket Submission
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
                    label={'Submission'}
                    icon={<LuListMinus color={'gray.900'} size={18} />}
                    to={`/${domainId}/ticket-desk/${ticketId}/submissions/${submissionId}/overview`}
                />
            </Flex>
        </Flex>
    );
};
