import { Flex } from '@chakra-ui/react';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { GoChevronRight, GoPeople } from 'react-icons/go';
import { useAuthStore } from '../state/stores/auth.store';
import { useUiStore } from '../state/stores/ui.store';
import { LuComponent } from 'react-icons/lu';
import { HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTicket } from 'react-icons/hi';
import { NavButton } from '../components/nav-button/NavButton';
import { TiHomeOutline } from 'react-icons/ti';
import { GiGraduateCap } from 'react-icons/gi';
import { BiNetworkChart } from 'react-icons/bi';

export const RootNavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const domains = useAuthStore((state) => state.user?.domains);
    const userId = useAuthStore((state) => state.user?.userId);
    const { activeDomain, setActiveDomain } = useUiStore();
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
        >
            <Flex
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
                    label={'Home'}
                    icon={<TiHomeOutline color={'gray.900'} size={18} />}
                    to={`/${activeDomain.domainId}/dashboard`}
                />

                <NavButton
                    label={'Domain'}
                    icon={<BiNetworkChart color={'gray.900'} size={18} />}
                    to={`/${activeDomain.domainId}/domain/overview`}
                    rightIcon={<GoChevronRight />}
                />

                <NavButton
                    icon={<GoPeople color={'gray.900'} size={18} />}
                    label={'Teams'}
                    to={`/${activeDomain.domainId}/teams`}
                />

                <NavButton
                    icon={<IoPersonOutline color={'gray.900'} size={18} />}
                    label={'People'}
                    to={`/${activeDomain.domainId}/people`}
                />

                <NavButton
                    icon={<LuComponent color={'gray.900'} size={18} />}
                    label={'Components'}
                    to={`/${activeDomain.domainId}/projects`}
                />

                <NavButton
                    icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                    label={'Docs'}
                    to={`/${activeDomain.domainId}/docs/relevant`}
                />

                <NavButton
                    icon={<MdOutlineWorkOutline color={'gray.900'} size={18} />}
                    label={'Work Areas'}
                    to={`/${activeDomain.domainId}/work-areas`}
                />

                <NavButton
                    icon={<HiOutlineTicket color={'gray.900'} size={18} />}
                    label={'Ticket Desk'}
                    to={`/${activeDomain.domainId}/ticket-desk`}
                    rightIcon={<GoChevronRight />}
                />

                <NavButton
                    icon={<HiOutlineInformationCircle color={'gray.900'} size={18} />}
                    label={'Knowledge Base'}
                    to={`/${activeDomain.domainId}/knowledge-base`}
                    rightIcon={<GoChevronRight />}
                />

                <NavButton
                    icon={<GiGraduateCap color={'gray.900'} size={18} />}
                    label={'Onboarding Centre'}
                    to={`/${activeDomain.domainId}/onboarding-centre`}
                    rightIcon={<GoChevronRight />}
                />
            </Flex>
        </Flex>
    );
};
