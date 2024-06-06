import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack, MdOutlineWorkOutline, MdWorkOutline } from 'react-icons/md';
import { LuListMinus, LuSettings } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { HiOutlineTicket } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { FaWpforms } from 'react-icons/fa';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { PiPlugsConnectedLight } from 'react-icons/pi';
import { LiaThListSolid } from 'react-icons/lia';
import { CiViewColumn } from 'react-icons/ci';

export const WorkAreaPageNavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const { domainId, areaId } = useParams() as WorkAreaPageParams;
    const navigate = useNavigate();

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
                    navigate(`/${domainId}/work-areas`);
                }}
            >
                Go back
            </Button>

            <Divider />

            <Flex mt={2} px={4} width={'100%'} gap={2} alignItems="center">
                <Flex alignItems={'center'} backgroundColor={'gray.500'} rounded={6} p={2}>
                    <MdOutlineWorkOutline color={'white'} />
                </Flex>

                <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                    Work Area
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
                    label={'Board'}
                    icon={<CiViewColumn color={'gray.900'} size={18} />}
                    to={`/${domainId}/work-areas/${areaId}/board`}
                />

                <NavButton
                    icon={<LiaThListSolid color={'gray.900'} size={18} />}
                    label={'Backlog'}
                    to={`/${domainId}/work-areas/${areaId}/backlog`}
                />

                <NavButton
                    icon={<MdWorkOutline color={'gray.900'} size={18} />}
                    label={'Items'}
                    to={`/${domainId}/work-areas/${areaId}/items`}
                />

                <NavButton
                    icon={<PiPlugsConnectedLight color={'gray.900'} size={18} />}
                    label={'Integrations'}
                    to={`/${domainId}/work-areas/${areaId}/integrations`}
                />

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${domainId}/work-areas/${areaId}/settings`}
                />
            </Flex>
        </Flex>
    );
};
