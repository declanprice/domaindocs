import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { DomainSelectorMenu } from './DomainSelectMenu.tsx'
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
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { useLayoutStore } from '@stores/layout.store.ts'
import { IoPersonAddOutline } from 'react-icons/io5'
import { LuBadgeHelp } from 'react-icons/lu'

const NavListItem = (props: { icon: any; label: string; to: string }) => {
    const { icon, label, to } = props

    return (
        <ListItem width={'100%'}>
            <Flex
                alignItems={'center'}
                gap={2}
                py={1}
                px={2}
                rounded={'md'}
                _hover={{
                    backgroundColor: 'gray.100',
                }}
                width={'100%'}
            >
                {icon}
                <NavLink to={to}>
                    <Text fontSize={14} color={'gray.900'}>
                        {label}
                    </Text>
                </NavLink>
            </Flex>
        </ListItem>
    )
}

export const FullNavBar = () => {
    const { closeNavBar } = useLayoutStore()

    return (
        <Flex
            height={'100%'}
            width={'400px'}
            background={'lightgray'}
            direction={'column'}
            borderRight={'1px solid'}
            borderColor={'border'}
        >
            <Flex
                p={2}
                width={'100%'}
                height={'55px'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                alignItems={'center'}
            >
                <DomainSelectorMenu />

                <Button
                    size={'sm'}
                    variant={'ghost'}
                    ml={'auto'}
                    onClick={closeNavBar}
                >
                    <TbLayoutSidebarLeftCollapse color={'gray.900'} />
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
                    <NavListItem
                        icon={<FiHome color={'gray.900'} />}
                        label={'Home'}
                        to={'/overview'}
                    />

                    <NavListItem
                        icon={<TbCategory2 color={'gray.900'} />}
                        label={'Subdomains'}
                        to={'/subdomains'}
                    />

                    <NavListItem
                        icon={<BsPeople color={'gray.900'} />}
                        label={'People & Teams'}
                        to={'/people-and-teams'}
                    />

                    <NavListItem
                        icon={<LiaProjectDiagramSolid color={'gray.900'} />}
                        label={'Projects & Services'}
                        to={'/projects-and-services'}
                    />

                    <NavListItem
                        icon={<IoDocumentTextOutline color={'gray.900'} />}
                        label={'Documentation'}
                        to={'/documentation'}
                    />

                    <NavListItem
                        icon={<MdOutlineSdStorage color={'gray.900'} />}
                        label={'Storage'}
                        to={'/storage'}
                    />

                    <NavListItem
                        icon={<RiLockPasswordLine color={'gray.900'} />}
                        label={'Secrets'}
                        to={'/secrets'}
                    />

                    <NavListItem
                        icon={<MdOutlineForum color={'gray.900'} />}
                        label={'Forums'}
                        to={'/forums'}
                    />

                    <NavListItem
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
                    <NavListItem
                        icon={<IoPersonAddOutline color={'gray.900'} />}
                        label={'Invite'}
                        to={'/invite'}
                    />

                    <NavListItem
                        icon={<LuBadgeHelp color={'gray.900'} />}
                        label={'Help'}
                        to={'/help'}
                    />
                </List>
            </Flex>
        </Flex>
    )
}
