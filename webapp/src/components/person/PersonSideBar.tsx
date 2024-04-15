import {
    Avatar,
    Badge,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Tab,
    TabList,
    Text,
    Tabs,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'

import { DetailedPerson } from '@state/api/people-api.ts'

type PersonSideBarProps = {
    isOpen: boolean
    onClose: () => void
    person: DetailedPerson | null
}

export const PersonSideBar = (props: PersonSideBarProps) => {
    const { isOpen, onClose, person } = props

    if (!person) return null

    return (
        <Drawer size={'lg'} isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <Tabs colorScheme={'gray'} size={'sm'} height={'100%'}>
                    <DrawerHeader pb={0}>
                        <Flex alignItems={'center'} mb={4}>
                            <Avatar
                                src={person.person.iconUri}
                                name={person.person.firstName}
                            />

                            <Flex
                                ml={4}
                                direction={'column'}
                                justifyContent={'center'}
                            >
                                <Text fontSize={14}>
                                    {person.person.firstName}{' '}
                                    {person.person.lastName}
                                </Text>

                                {person.person.roleName ? (
                                    <Text fontSize={12}>
                                        {person.person.roleName}
                                    </Text>
                                ) : (
                                    <Badge colorScheme={'yellow'} size={'xs'}>
                                        No Role Assigned
                                    </Badge>
                                )}
                            </Flex>
                        </Flex>

                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Projects</Tab>
                        </TabList>
                    </DrawerHeader>

                    <DrawerBody backgroundColor={'gray.100'} height={'100%'}>
                        <TabPanels>
                            <TabPanel>overview</TabPanel>

                            <TabPanel>projects</TabPanel>
                        </TabPanels>
                    </DrawerBody>
                </Tabs>
            </DrawerContent>
        </Drawer>
    )
}
