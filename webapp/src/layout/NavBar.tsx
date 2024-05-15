import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { MdOutlineManageHistory } from 'react-icons/md';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import { IoPersonAddOutline } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { useAuthStore } from '../state/stores/auth.store';
import { useUiStore } from '../state/stores/ui.store';
import { DomainSelectorMenu } from './DomainSelectorMenu';
import { BsInbox } from 'react-icons/bs';
import { PiFloppyDiskLight } from 'react-icons/pi';
import { SiReacthookform } from 'react-icons/si';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlinePerson } from 'react-icons/md';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { AiOutlineProfile } from 'react-icons/ai';

const NavListItem = (props: { icon: any; label: string; to: string; iconOnly: boolean }) => {
    const navigate = useNavigate();

    const { icon, label, to, iconOnly } = props;

    return (
        <ListItem key={props.label}>
            <Button
                variant={'ghost'}
                colorScheme={'gray'}
                alignItems={'center'}
                justifyContent={iconOnly ? 'center' : 'flex-start'}
                display={'flex'}
                fontWeight={'regular'}
                gap={3}
                width={'100%'}
                onClick={() => {
                    navigate(to);
                }}
            >
                {icon}

                {!iconOnly && (
                    <Text fontSize={12} color={'gray.900'}>
                        {label}
                    </Text>
                )}
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
            width={isFullNavBar ? '280px' : '55px'}
            minWidth={isFullNavBar ? '280px' : '55px'}
            background={'lightgray'}
            direction={'column'}
            borderRight={'1px solid'}
            borderColor={'border'}
        >
            <Flex borderBottom={'1px solid'} height={'40px'} borderColor={'border'} alignItems={'center'}>
                <DomainSelectorMenu
                    value={activeDomain}
                    options={domains}
                    onSelect={setActiveDomain}
                    iconOnly={!isFullNavBar}
                />
            </Flex>

            {!isFullNavBar && (
                <Flex width={'100%'} borderBottom={'1px solid'} borderColor={'border'} justifyContent={'center'}>
                    <Button
                        variant={'ghost'}
                        colorScheme={'gray'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        fontWeight={'regular'}
                        gap={3}
                        width={'100%'}
                        onClick={() => {
                            openNavBar();
                        }}
                    >
                        <TbLayoutSidebarRightCollapse color={'gray.900'} size={18} />
                    </Button>
                </Flex>
            )}

            {isFullNavBar && (
                <Flex width={'100%'} borderBottom={'1px solid'} borderColor={'border'} justifyContent={'center'}>
                    <Button
                        variant={'ghost'}
                        colorScheme={'gray'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        fontWeight={'regular'}
                        gap={3}
                        width={'100%'}
                        onClick={() => {
                            closeNavBar();
                        }}
                    >
                        <TbLayoutSidebarLeftCollapse color={'gray.900'} size={18} />
                    </Button>
                </Flex>
            )}

            <Flex
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                justifyContent={'flex-end'}
            >
                <List width={'100%'} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        icon={<AiOutlineProfile color={'gray.900'} size={18} />}
                        label={'My Profile'}
                        to={`/${activeDomain.domainId}/people/${userId}`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<BsInbox color={'gray.900'} size={18} />}
                        label={'Inbox'}
                        to={`/${activeDomain.domainId}/inbox`}
                        iconOnly={!isFullNavBar}
                    />
                </List>
            </Flex>

            <Flex
                width={'100%'}
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                flex={1}
            >
                <List width={'100%'} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        label={'Home'}
                        icon={<FiHome color={'gray.900'} size={18} />}
                        to={`/${activeDomain.domainId}/home/overview`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<MdOutlinePerson color={'gray.900'} size={18} />}
                        label={'People'}
                        to={`/${activeDomain.domainId}/people`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<GoPeople color={'gray.900'} size={18} />}
                        label={'Teams'}
                        to={`/${activeDomain.domainId}/teams`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<LiaProjectDiagramSolid color={'gray.900'} size={18} />}
                        label={'Projects'}
                        to={`/${activeDomain.domainId}/projects`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<IoDocumentTextOutline color={'gray.900'} size={18} />}
                        label={'Documentation'}
                        to={`/${activeDomain.domainId}/documentation/relevant`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<MdOutlineWorkOutline color={'gray.900'} size={18} />}
                        label={'Work Areas'}
                        to={`/${activeDomain.domainId}/work-areas`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<SiReacthookform color={'gray.900'} size={18} />}
                        label={'Forms'}
                        to={`/${activeDomain.domainId}/forms`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<MdOutlineManageHistory color={'gray.900'} size={18} />}
                        label={'Onboarding'}
                        to={`/${activeDomain.domainId}/onboarding`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<PiFloppyDiskLight color={'gray.900'} size={18} />}
                        label={'Files'}
                        to={`${activeDomain.domainId}/files`}
                        iconOnly={!isFullNavBar}
                    />
                </List>
            </Flex>

            <Flex direction={'column'} overflowY={'auto'} justifyContent={'flex-end'}>
                <List width={'100%'} gap={2} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        icon={<IoPersonAddOutline color={'gray.900'} size={18} />}
                        label={'Invite'}
                        to={'/invite'}
                        iconOnly={!isFullNavBar}
                    />
                </List>
            </Flex>
        </Flex>
    );
};
