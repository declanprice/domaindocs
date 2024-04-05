import { Button, Flex, List, ListItem } from '@chakra-ui/react'
import { SimpleDomainSelectorMenu } from './DomainSelectMenu.tsx'
import { FiHome } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { TbCategory2, TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { BsPeople } from 'react-icons/bs'
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdOutlineSdStorage } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineForum } from 'react-icons/md'
import { MdOutlineManageHistory } from 'react-icons/md'
import { IoPersonAddOutline } from 'react-icons/io5'
import { LuBadgeHelp } from 'react-icons/lu'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'
import { useLayoutStore } from '@stores/layout.store.ts'

const SimpleNavItem = (props: { icon: any; label: string; to: string }) => {
    const { icon, label, to } = props

    return (
        <ListItem
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            p={2}
            rounded={'md'}
            _hover={{
                backgroundColor: 'gray.100',
            }}
        >
            <NavLink to={to} aria-label={label}>
                {icon}
            </NavLink>
        </ListItem>
    )
}

export const SimpleNavBar = () => {
    const { openNavBar } = useLayoutStore()

    return (
        <Flex
            height={'100%'}
            background={'lightgray'}
            borderRight={'1px solid'}
            borderColor={'border'}
            direction={'column'}
        >
            <Flex
                p={2}
                width={'100%'}
                height={'55px'}
                direction={'column'}
                justifyContent={'center'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                alignItems={'center'}
            >
                <SimpleDomainSelectorMenu />
            </Flex>

            <Flex
                width={'100%'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                justifyContent={'center'}
                p={2}
                onClick={openNavBar}
            >
                <Button size={'sm'} variant={'ghost'} onClick={() => {}}>
                    <TbLayoutSidebarRightCollapse color={'gray.900'} />
                </Button>
            </Flex>

            <Flex
                width={'100%'}
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
            >
                <List
                    width={'100%'}
                    gap={2}
                    p={4}
                    display={'flex'}
                    flexDir={'column'}
                >
                    <SimpleNavItem
                        icon={<FiHome color={'gray.900'} />}
                        label={'Home'}
                        to={'/overview'}
                    />

                    <SimpleNavItem
                        icon={<TbCategory2 color={'gray.900'} />}
                        label={'Subdomains'}
                        to={'/subdomains'}
                    />

                    <SimpleNavItem
                        icon={<BsPeople color={'gray.900'} />}
                        label={'People & Teams'}
                        to={'/people-and-teams'}
                    />

                    <SimpleNavItem
                        icon={<LiaProjectDiagramSolid color={'gray.900'} />}
                        label={'Projects & Services'}
                        to={'/projects-and-services'}
                    />

                    <SimpleNavItem
                        icon={<IoDocumentTextOutline color={'gray.900'} />}
                        label={'Documentation'}
                        to={'/documentation'}
                    />

                    <SimpleNavItem
                        icon={<MdOutlineSdStorage color={'gray.900'} />}
                        label={'Storage'}
                        to={'/storage'}
                    />

                    <SimpleNavItem
                        icon={<RiLockPasswordLine color={'gray.900'} />}
                        label={'Secrets'}
                        to={'/secrets'}
                    />

                    <SimpleNavItem
                        icon={<MdOutlineForum color={'gray.900'} />}
                        label={'Forums'}
                        to={'/forums'}
                    />

                    <SimpleNavItem
                        icon={<MdOutlineManageHistory color={'gray.900'} />}
                        label={'Onboarding Console'}
                        to={'/onboarding'}
                    />
                </List>
            </Flex>

            <Flex
                width={'100%'}
                height={'100%'}
                direction={'column'}
                justifyContent={'flex-end'}
            >
                <List
                    borderTop={'1px solid'}
                    borderColor={'border'}
                    gap={2}
                    p={4}
                    display={'flex'}
                    flexDir={'column'}
                    width={'100%'}
                >
                    <SimpleNavItem
                        icon={<IoPersonAddOutline color={'gray.900'} />}
                        label={'Invite'}
                        to={'/invite'}
                    />

                    <SimpleNavItem
                        icon={<LuBadgeHelp color={'gray.900'} />}
                        label={'Help'}
                        to={'/help'}
                    />
                </List>
            </Flex>
        </Flex>
    )
}
