import { Button, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { DomainSelectorMenu } from './DomainSelectorMenu.tsx'
import { FiHome } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { TbCategory2 } from 'react-icons/tb'
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdOutlineSdStorage } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineManageHistory } from 'react-icons/md'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { useLayoutStore } from '@stores/layout.store.ts'
import { IoPersonAddOutline } from 'react-icons/io5'
import { LuBadgeHelp } from 'react-icons/lu'
import { GoPeople } from 'react-icons/go'
import { TbUsersGroup } from 'react-icons/tb'
const NavListItem = (props: { icon: any; label: string; to: string }) => {
    const { icon, label, to } = props

    return (
        <ListItem width={'100%'} key={props.label}>
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
                    <Text fontSize={12} color={'gray.900'}>
                        {label}
                    </Text>
                </NavLink>
            </Flex>
        </ListItem>
    )
}

export const NavBar = () => {
    const { closeNavBar } = useLayoutStore()

    return (
        <Flex
            height={'100%'}
            width={'280px'}
            minWidth={'280px'}
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
                        to={'/overview'}
                    />

                    <NavListItem
                        icon={<TbCategory2 color={'gray.900'} size={14} />}
                        label={'Subdomains'}
                        to={'/subdomain'}
                    />

                    <NavListItem
                        icon={<GoPeople color={'gray.900'} size={14} />}
                        label={'People'}
                        to={'/people'}
                    />

                    <NavListItem
                        icon={<TbUsersGroup color={'gray.900'} size={14} />}
                        label={'Teams'}
                        to={'/teams'}
                    />

                    <NavListItem
                        icon={
                            <LiaProjectDiagramSolid
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Projects'}
                        to={'/projects'}
                    />

                    <NavListItem
                        icon={
                            <IoDocumentTextOutline
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Documentation'}
                        to={'/documentation'}
                    />

                    <NavListItem
                        icon={
                            <MdOutlineSdStorage color={'gray.900'} size={14} />
                        }
                        label={'Files'}
                        to={'/files'}
                    />

                    <NavListItem
                        icon={
                            <RiLockPasswordLine color={'gray.900'} size={14} />
                        }
                        label={'Secrets'}
                        to={'/secrets'}
                    />

                    <NavListItem
                        icon={
                            <MdOutlineManageHistory
                                color={'gray.900'}
                                size={14}
                            />
                        }
                        label={'Onboarding'}
                        to={'/onboarding'}
                    />
                </List>
            </Flex>

            <List
                justifyContent={'flex-end'}
                borderTop={'1px solid'}
                borderColor={'border'}
                p={2}
                gap={2}
                display={'flex'}
                flexDir={'column'}
                width={'100%'}
            >
                <NavListItem
                    icon={<IoPersonAddOutline color={'gray.900'} size={14} />}
                    label={'Invite'}
                    to={'/invite'}
                />

                <NavListItem
                    icon={<LuBadgeHelp color={'gray.900'} size={14} />}
                    label={'Help'}
                    to={'/help'}
                />
            </List>
        </Flex>
    )
}
