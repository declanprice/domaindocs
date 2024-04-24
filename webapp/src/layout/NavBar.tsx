import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { TbCategory2, TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineManageHistory } from 'react-icons/md';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import { IoPersonAddOutline } from 'react-icons/io5';
import { LuBadgeHelp } from 'react-icons/lu';
import { GoPeople } from 'react-icons/go';
import { TbUsersGroup } from 'react-icons/tb';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../state/stores/auth.store';
import { useUiStore } from '../state/stores/ui.store';
import { subdomainsApi } from '../state/api/subdomains-api';
import { DomainSelectorMenu } from './DomainSelectorMenu';
import { SubdomainDto } from '@domaindocs/lib';
import { GoTasklist } from 'react-icons/go';
import { FaWpforms } from 'react-icons/fa6';

const NavListItem = (props: { icon: any; label: string; to: string; iconOnly: boolean }) => {
    const navigate = useNavigate();

    const { icon, label, to, iconOnly } = props;

    return (
        <ListItem width={'100%'} key={props.label}>
            <Button
                variant={'ghost'}
                colorScheme={'gray'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                display={'flex'}
                size={'xs'}
                width={'100%'}
                fontWeight={'regular'}
                gap={4}
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
    const { domainId } = useParams() as { domainId: string };
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const domains = useAuthStore((state) => state.user?.domains);
    const { activeDomain, setActiveDomain } = useUiStore();

    const { data: subdomains } = useQuery<SubdomainDto[]>({
        queryKey: ['searchSubdomains', { domainId }],
        queryFn: () => subdomainsApi.searchSubdomains(domainId),
    });

    if (!subdomains || !domains || !activeDomain) return 'active domains not set.';

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
            <Flex
                p={2}
                width={'100%'}
                height={'45px'}
                minHeight={'45px'}
                maxHeight={'45px'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                alignItems={'center'}
            >
                <DomainSelectorMenu
                    value={activeDomain}
                    options={domains}
                    onSelect={setActiveDomain}
                    iconOnly={!isFullNavBar}
                />

                {isFullNavBar && (
                    <Button size={'sm'} variant={'ghost'} ml={'auto'} onClick={closeNavBar}>
                        <TbLayoutSidebarLeftCollapse color={'gray.900'} />
                    </Button>
                )}
            </Flex>

            {!isFullNavBar && (
                <Flex
                    borderBottom={'1px solid'}
                    borderColor={'border'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onClick={openNavBar}
                >
                    <Button my={2} size={'xs'} variant={'ghost'} onClick={() => {}}>
                        <TbLayoutSidebarRightCollapse color={'gray.900'} size={14} />
                    </Button>
                </Flex>
            )}

            <Flex
                width={'100%'}
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                flex={1}
            >
                <List width={'100%'} gap={2} p={3} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        label={'Home'}
                        icon={<FiHome color={'gray.900'} size={14} />}
                        to={`/${activeDomain.domainId}/home`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<GoPeople color={'gray.900'} size={14} />}
                        label={'People'}
                        to={`/${activeDomain.domainId}/people`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<TbUsersGroup color={'gray.900'} size={14} />}
                        label={'Teams'}
                        to={`/${activeDomain.domainId}/teams`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<LiaProjectDiagramSolid color={'gray.900'} size={14} />}
                        label={'Products'}
                        to={`/${activeDomain.domainId}/projects`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<IoDocumentTextOutline color={'gray.900'} size={14} />}
                        label={'Product Documentation'}
                        to={`/${activeDomain.domainId}/documentation/relevant`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<GoTasklist color={'gray.900'} size={14} />}
                        label={'Product Management'}
                        to={`${activeDomain.domainId}/work`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<FaWpforms color={'gray.900'} size={14} />}
                        label={'Request Forms'}
                        to={`${activeDomain.domainId}/forms`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<MdOutlineManageHistory color={'gray.900'} size={14} />}
                        label={'Onboarding'}
                        to={`/${activeDomain.domainId}/onboarding`}
                        iconOnly={!isFullNavBar}
                    />
                </List>
            </Flex>

            <Flex
                direction={'column'}
                borderTop={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                justifyContent={'flex-end'}
            >
                <List width={'100%'} gap={2} p={3} display={'flex'} flexDir={'column'}>
                    <NavListItem
                        icon={<IoPersonAddOutline color={'gray.900'} size={14} />}
                        label={'Invite'}
                        to={'/invite'}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<LuBadgeHelp color={'gray.900'} size={14} />}
                        label={'Help'}
                        to={'/help'}
                        iconOnly={!isFullNavBar}
                    />
                </List>
            </Flex>
        </Flex>
    );
};
