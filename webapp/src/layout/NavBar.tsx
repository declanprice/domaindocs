import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { MdDomain, MdOutlineManageHistory, MdOutlineWorkOutline } from 'react-icons/md';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import { IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { useAuthStore } from '../state/stores/auth.store';
import { useUiStore } from '../state/stores/ui.store';
import { DomainSelectorMenu } from './DomainSelectorMenu';
import { BsInbox } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlinePerson } from 'react-icons/md';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { AiOutlineProfile } from 'react-icons/ai';
import { SiReacthookform } from 'react-icons/si';
import { LuComponent } from 'react-icons/lu';
import { HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTicket } from 'react-icons/hi';
import { PiTicketThin } from 'react-icons/pi';

const NavListItem = (props: { icon: any; label: string; to: string }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { icon, label, to } = props;

    const isActive = location.pathname === to;

    return (
        <ListItem key={props.label}>
            <Button
                variant={'ghost'}
                colorScheme={'gray'}
                alignItems={'center'}
                display={'flex'}
                fontWeight={'regular'}
                justifyContent={'flex-start'}
                isActive={isActive}
                _active={{
                    backgroundColor: 'gray.100',
                }}
                gap={2}
                width={'100%'}
                onClick={() => {
                    navigate(to);
                }}
                leftIcon={icon}
            >
                <Text fontSize={12} color={'gray.900'} fontWeight={'300'}>
                    {label}
                </Text>
            </Button>
        </ListItem>
    );
};

export const NavBar = () => {
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
            >
                <List spacing={2} width={'100%'} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        label={'Domain'}
                        icon={<MdDomain color={'gray.900'} size={18} />}
                        to={`/${activeDomain.domainId}/home/dashboard`}
                    />

                    <NavListItem
                        icon={<IoPersonOutline color={'gray.900'} size={18} />}
                        label={'People'}
                        to={`/${activeDomain.domainId}/people`}
                    />

                    <NavListItem
                        icon={<GoPeople color={'gray.900'} size={18} />}
                        label={'Teams'}
                        to={`/${activeDomain.domainId}/teams`}
                    />

                    <NavListItem
                        icon={<LuComponent color={'gray.900'} size={18} />}
                        label={'Components'}
                        to={`/${activeDomain.domainId}/projects`}
                    />

                    <NavListItem
                        icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                        label={'Documentation'}
                        to={`/${activeDomain.domainId}/docs/relevant`}
                    />

                    <NavListItem
                        icon={<MdOutlineWorkOutline color={'gray.900'} size={18} />}
                        label={'Work Areas'}
                        to={`/${activeDomain.domainId}/work-areas`}
                    />

                    <NavListItem
                        icon={<HiOutlineTicket color={'gray.900'} size={18} />}
                        label={'Help Desk'}
                        to={`/${activeDomain.domainId}/forms`}
                    />

                    <NavListItem
                        icon={<HiOutlineInformationCircle color={'gray.900'} size={18} />}
                        label={'Knowledge Base'}
                        to={`/${activeDomain.domainId}/forms`}
                    />

                    <NavListItem
                        icon={<MdOutlineManageHistory color={'gray.900'} size={18} />}
                        label={'Onboarding Center'}
                        to={`/${activeDomain.domainId}/onboarding`}
                    />
                </List>
            </Flex>
        </Flex>
    );
};
