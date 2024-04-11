import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { DomainSelectorMenu } from './DomainSelectorMenu.tsx'
import { FiHome } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { TbCategory2, TbLayoutSidebarRightCollapse } from 'react-icons/tb'
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdOutlineSdStorage } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineManageHistory } from 'react-icons/md'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { IoPersonAddOutline } from 'react-icons/io5'
import { LuBadgeHelp } from 'react-icons/lu'
import { GoPeople } from 'react-icons/go'
import { TbUsersGroup } from 'react-icons/tb'
import { useUiStore } from '@state/stores/ui.store.ts'
import { useAuthStore } from '@state/stores/auth.store.ts'

const NavListItem = (props: {
    icon: any
    label: string
    to: string
    iconOnly: boolean
}) => {
    const navigate = useNavigate()

    const { icon, label, to, iconOnly } = props

    console.log('to', to)

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
                gap={4}
                onClick={() => {
                    navigate(to)
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
    )
}

export const NavBar = () => {
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore()
    const domains = useAuthStore((state) => state.user?.domains)
    const { activeDomain, setActiveDomain } = useUiStore()
    if (!domains || !activeDomain) return 'active domains not set.'

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
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        ml={'auto'}
                        onClick={closeNavBar}
                    >
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
                    <Button
                        my={2}
                        size={'xs'}
                        variant={'ghost'}
                        onClick={() => {}}
                    >
                        <TbLayoutSidebarRightCollapse
                            color={'gray.900'}
                            size={14}
                        />
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
                <List
                    width={'100%'}
                    gap={2}
                    p={3}
                    display={'flex'}
                    flexDir={'column'}
                >
                    <NavListItem
                        icon={<FiHome color={'gray.900'} size={14} />}
                        label={'Home'}
                        to={`/${activeDomain.slug}/home`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<TbCategory2 color={'gray.900'} size={14} />}
                        label={'Subdomains'}
                        to={`/${activeDomain.slug}/subdomains`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<GoPeople color={'gray.900'} size={14} />}
                        label={'People'}
                        to={`/${activeDomain.slug}/people`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={<TbUsersGroup color={'gray.900'} size={14} />}
                        label={'Teams'}
                        to={`/${activeDomain.slug}/teams`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={
                            <LiaProjectDiagramSolid
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Projects'}
                        to={`/${activeDomain.slug}/projects`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={
                            <IoDocumentTextOutline
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Documentation'}
                        to={`/${activeDomain.slug}/documentation`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={
                            <MdOutlineSdStorage color={'gray.900'} size={14} />
                        }
                        label={'Files'}
                        to={`/${activeDomain.slug}/files`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={
                            <RiLockPasswordLine color={'gray.900'} size={14} />
                        }
                        label={'Secrets'}
                        to={`/${activeDomain.slug}/secrets`}
                        iconOnly={!isFullNavBar}
                    />

                    <NavListItem
                        icon={
                            <MdOutlineManageHistory
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Onboarding'}
                        to={`/${activeDomain.slug}/onboarding`}
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
                <List
                    width={'100%'}
                    gap={2}
                    p={3}
                    display={'flex'}
                    flexDir={'column'}
                >
                    <NavListItem
                        icon={
                            <IoPersonAddOutline color={'gray.900'} size={14} />
                        }
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
    )
}
