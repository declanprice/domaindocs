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
    Wrap,
    WrapItem,
    DrawerCloseButton,
    SimpleGrid,
    GridItem,
} from '@chakra-ui/react';

import { DetailedPersonDto } from '@domaindocs/lib';

type PersonSideBarProps = {
    isOpen: boolean;
    onClose: () => void;
    person: DetailedPersonDto | null;
};

export const PersonSideBar = (props: PersonSideBarProps) => {
    const { isOpen, onClose, person } = props;

    if (!person) return null;

    return (
        <Drawer size={'lg'} isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <Tabs colorScheme={'gray'} size={'sm'} height={'100%'}>
                    <DrawerHeader pb={0}>
                        <DrawerCloseButton />

                        <Flex alignItems={'center'} mb={4}>
                            <Avatar src={person.person.iconUri} name={person.person.firstName} />

                            <Flex ml={4} direction={'column'} justifyContent={'center'}>
                                <Text fontSize={14}>
                                    {person.person.firstName} {person.person.lastName}
                                </Text>

                                {person.person.roleName ? (
                                    <Text fontSize={12}>{person.person.roleName}</Text>
                                ) : (
                                    <Badge colorScheme={'yellow'} size={'xs'}>
                                        No Role Assigned
                                    </Badge>
                                )}
                            </Flex>
                        </Flex>

                        <TabList borderBottom={'0'}>
                            <Tab>Overview</Tab>
                            <Tab>Projects</Tab>
                        </TabList>
                    </DrawerHeader>

                    <DrawerBody
                        borderTop={'1px solid'}
                        borderColor={'border'}
                        backgroundColor={'gray.100'}
                        height={'100%'}
                    >
                        <TabPanels>
                            <TabPanel p={0}>
                                <OverviewTab person={person} />
                            </TabPanel>

                            <TabPanel p={0}>
                                <ProjectTab person={person} />
                            </TabPanel>
                        </TabPanels>
                    </DrawerBody>
                </Tabs>
            </DrawerContent>
        </Drawer>
    );
};

const OverviewTab = (props: { person: DetailedPersonDto }) => {
    const { person } = props;

    const contact = person.person.contact;

    return (
        <Flex direction={'column'}>
            <Flex direction={'column'} py={2} gap={2}>
                <>
                    {person.teams.map((t) => (
                        <Flex direction={'column'}>
                            <Text mb={1}>Team</Text>
                            <Text fontSize={12}>{t.teamName}</Text>
                        </Flex>
                    ))}

                    <Flex direction={'column'}>
                        <Text mb={1}>Role</Text>
                        <Text fontSize={12}>{person.person.roleName}</Text>
                    </Flex>
                </>
            </Flex>

            <Flex borderTop={'1px solid'} borderColor={'border'} py={2}>
                <Flex direction={'column'} width={'100%'}>
                    <Text mb={2}>Contact Details</Text>

                    <SimpleGrid width={'100%'} columns={2} spacing={4}>
                        {contact.personalContactEmail && (
                            <GridItem>
                                <Flex direction={'column'}>
                                    <Text mb={1} fontSize={14}>
                                        Personal Email
                                    </Text>
                                    <Text fontSize={12}>{contact.personalContactEmail}</Text>
                                </Flex>
                            </GridItem>
                        )}

                        {contact.personalContactMobile && (
                            <GridItem>
                                <Flex direction={'column'}>
                                    <Text mb={1} fontSize={14}>
                                        Personal Mobile
                                    </Text>
                                    <Text fontSize={12}>{contact.personalContactMobile}</Text>
                                </Flex>
                            </GridItem>
                        )}

                        {contact.contactEmail && (
                            <GridItem>
                                <Flex direction={'column'}>
                                    <Text mb={1} fontSize={14}>
                                        Work Email
                                    </Text>
                                    <Text fontSize={12}>{contact.contactEmail}</Text>
                                </Flex>
                            </GridItem>
                        )}

                        {contact.contactMobile && (
                            <GridItem>
                                <Flex direction={'column'}>
                                    <Text mb={1} fontSize={14}>
                                        Work Mobile
                                    </Text>
                                    <Text fontSize={12}>{contact.contactMobile}</Text>
                                </Flex>
                            </GridItem>
                        )}
                    </SimpleGrid>
                </Flex>
            </Flex>

            <Flex borderTop={'1px solid'} borderColor={'border'} py={2}>
                <Flex direction={'column'}>
                    <Text mb={1}>Skills</Text>
                    <Wrap spacing={2}>
                        {person.skills.map((s) => (
                            <WrapItem>
                                <Badge colorScheme={'yellow'} size={'xs'}>
                                    {s.skillName}
                                </Badge>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Flex>
            </Flex>
        </Flex>
    );
};

const ProjectTab = (props: { person: DetailedPersonDto }) => {
    const {} = props;

    return <>overview</>;
};
