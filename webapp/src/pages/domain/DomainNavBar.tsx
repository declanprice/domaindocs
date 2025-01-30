import { Button, Box, Flex, Text } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { useAuthStore } from '../../state/stores/auth.store';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus, LuSettings } from 'react-icons/lu';
import { PiPlugsConnected } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/ui/avatar';

export const DomainNavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const domains = useAuthStore((state) => state.user?.domains);
    const { activeDomain, setActiveDomain } = useUiStore();
    const navigate = useNavigate();
    if (!domains || !activeDomain) return 'active domains not set.';

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
                width={'100%'}
                justifyContent={'flex-start'}
                mt={2}
                fontWeight={'300'}
                onClick={() => {
                    navigate(`/${activeDomain.domainId}/dashboard`);
                }}
            >
                <MdArrowBack /> Go back
            </Button>

            <Box divideX={'1px'} />

            <Flex mt={2} px={4} width={'100%'} gap={2} alignItems="center" direction={'row'}>
                <Avatar name={activeDomain.name} size={'sm'} rounded={'lg'} />

                <Flex direction={'column'}>
                    <Text
                        color={'gray.900'}
                        fontSize={14}
                        fontWeight={'400'}
                        maxWidth={'170px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                    >
                        {activeDomain.name}
                    </Text>

                    <Text color={'gray.900'} fontSize={12} fontWeight={'300'}>
                        Domain
                    </Text>
                </Flex>
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
                    to={`/${activeDomain.domainId}/domain/overview`}
                />

                <NavButton
                    icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                    label={'Docs'}
                    to={`/${activeDomain.domainId}/domain/documentation`}
                />

                {/*<NavButton*/}
                {/*    icon={<PiPlugsConnected color={'gray.900'} size={18} />}*/}
                {/*    label={'Integrations'}*/}
                {/*    to={`/${activeDomain.domainId}/domain/integrations`}*/}
                {/*/>*/}

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${activeDomain.domainId}/domain/settings`}
                />
            </Flex>
        </Flex>
    );
};
