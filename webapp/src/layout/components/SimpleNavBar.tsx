import {
    Avatar,
    Button,
    Flex,
    List,
    ListItem,
    Menu,
    MenuButton,
} from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { TbCategory2 } from 'react-icons/tb'
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

const SimpleDomainSelectorMenu = () => {
    return (
        <Menu>
            <MenuButton
                _hover={{ backgroundColor: 'gray.100' }}
                p={1}
                rounded="lg"
            >
                <Avatar
                    name={'Registers Of Scotland'}
                    size={'xs'}
                    rounded={'lg'}
                    backgroundColor={'gray.200'}
                ></Avatar>
            </MenuButton>
        </Menu>
    )
}

const SimpleNavItem = (props: { icon: any; label: string; to: string }) => {
    const { icon, label, to } = props

    return (
        <ListItem
            alignItems={'center'}
            justifyContent={'center'}
            rounded={'md'}
            p={2}
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
            width={'55px'}
            height={'100%'}
            background={'lightgray'}
            borderRight={'1px solid'}
            borderColor={'border'}
            direction={'column'}
        >
            <Flex
                width={'100%'}
                height={'45px'}
                direction={'column'}
                justifyContent={'center'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                alignItems={'center'}
            >
                <SimpleDomainSelectorMenu />
            </Flex>

            <Flex
                borderBottom={'1px solid'}
                borderColor={'border'}
                justifyContent={'center'}
                alignItems={'center'}
                onClick={openNavBar}
            >
                <Button my={2} size={'xs'} variant={'ghost'} onClick={() => {}}>
                    <TbLayoutSidebarRightCollapse
                        color={'gray.900'}
                        size={14}
                    />
                </Button>
            </Flex>

            <List
                py={1}
                flex={1}
                borderBottom={'1px solid'}
                borderColor={'border'}
                display={'flex'}
                flexDir={'column'}
                gap={1}
                alignItems={'center'}
            >
                <SimpleNavItem
                    icon={<FiHome color={'gray.900'} size={14} />}
                    label={'Home'}
                    to={'/overview'}
                />

                <SimpleNavItem
                    icon={<TbCategory2 color={'gray.900'} size={14} />}
                    label={'Subdomains'}
                    to={'/subdomains'}
                />

                <SimpleNavItem
                    icon={<BsPeople color={'gray.900'} size={14} />}
                    label={'People & Teams'}
                    to={'/people-and-teams'}
                />

                <SimpleNavItem
                    icon={
                        <LiaProjectDiagramSolid color={'gray.900'} size={14} />
                    }
                    label={'Projects & Services'}
                    to={'/projects-and-services'}
                />

                <SimpleNavItem
                    icon={
                        <IoDocumentTextOutline color={'gray.900'} size={14} />
                    }
                    label={'Documentation'}
                    to={'/documentation'}
                />

                <SimpleNavItem
                    icon={<MdOutlineSdStorage color={'gray.900'} size={14} />}
                    label={'Storage'}
                    to={'/storage'}
                />

                <SimpleNavItem
                    icon={<RiLockPasswordLine color={'gray.900'} size={14} />}
                    label={'Secrets'}
                    to={'/secrets'}
                />

                <SimpleNavItem
                    icon={<MdOutlineForum color={'gray.900'} size={14} />}
                    label={'Forums'}
                    to={'/forums'}
                />

                <SimpleNavItem
                    icon={
                        <MdOutlineManageHistory color={'gray.900'} size={14} />
                    }
                    label={'Onboarding Console'}
                    to={'/onboarding'}
                />
            </List>

            <List
                justifyContent={'flex-end'}
                alignItems={'center'}
                borderColor={'border'}
                display={'flex'}
                flexDir={'column'}
                gap={1}
                p={1}
            >
                <SimpleNavItem
                    icon={<IoPersonAddOutline color={'gray.900'} size={14} />}
                    label={'Invite'}
                    to={'/invite'}
                />

                <SimpleNavItem
                    icon={<LuBadgeHelp color={'gray.900'} size={14} />}
                    label={'Help'}
                    to={'/help'}
                />
            </List>
        </Flex>
    )
}
