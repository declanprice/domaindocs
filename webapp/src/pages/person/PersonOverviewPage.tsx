import { Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Stack, Text } from '@chakra-ui/react';
import { DetailedPerson } from '@domaindocs/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonPageParams } from './PersonPageParams';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { GoPeople } from 'react-icons/go';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { PersonDetails } from './components/PersonDetails';
import { PersonRoles } from './components/PersonRoles';
import { PersonSkills } from './components/PersonSkills';

export const PersonOverviewPage = () => {
    const { domainId, userId } = useParams() as PersonPageParams;

    const navigate = useNavigate();

    // const skillsEdit = useEditable();
    // const contactEdit = useEditable();
    // const rolesEdit = useEditable();

    const {
        data: person,
        isLoading,
        refetch,
    } = useQuery<DetailedPerson>({
        queryKey: ['getPerson', { domainId, userId }],
        queryFn: () => peopleApi.get(domainId, userId),
    });

    if (!person || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/${domainId}/people`}
                            fontSize={14}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${domainId}/people`);
                            }}
                        >
                            People
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/people/${userId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {person.person.firstName} {person.person.lastName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Avatar
                    name={`${person.person.firstName} ${person.person.lastName}`}
                    src={person.person.iconUri}
                    size={'lg'}
                />

                <Text fontSize={18} fontWeight={500}>
                    {person.person.firstName} {person.person.lastName}
                </Text>

                <Stack mt={4} spacing={2}>
                    <Text fontSize={14}>About Me</Text>

                    <Text fontSize={12}>
                        I am a passionate web developer who loves building web applications using AWS services and
                        JavaScript technologies.
                    </Text>
                </Stack>

                <Stack mt={4} spacing={2}>
                    <Text fontSize={14}>Declan's Components</Text>
                </Stack>
            </Flex>

            <Flex direction={'column'} width={'350px'} p={4} gap={4}>
                <PersonDetails person={person} />

                <PersonRoles domainId={domainId} person={person} />

                <PersonSkills domainId={domainId} person={person} />

                <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
                    <Flex alignItems={'center'} gap={4}>
                        <Flex alignItems={'center'} backgroundColor={'yellow.400'} rounded={6} p={2}>
                            <MdConnectWithoutContact color={'white'} />
                        </Flex>

                        <Text>Contact</Text>
                    </Flex>

                    <Stack spacing={3} pl={1}>
                        <Flex alignItems={'center'} gap={2}>
                            <MdOutlineEmail fontSize={18} color={'gray.900'} />
                            <Text fontSize={12} fontWeight={300}>
                                declanprice1@gmail.com
                            </Text>
                        </Flex>

                        <Flex alignItems={'center'} gap={2}>
                            <MdOutlinePhone fontSize={18} color={'gray.900'} />
                            <Text fontSize={12} fontWeight={300}>
                                0756489541
                            </Text>
                        </Flex>
                    </Stack>
                </Flex>

                <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
                    <Flex alignItems={'center'} gap={4}>
                        <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                            <GoPeople color={'white'} />
                        </Flex>

                        <Text>Teams</Text>
                    </Flex>

                    <Stack spacing={2}>
                        <Text fontSize={12} fontWeight={300}>
                            Team Orion
                        </Text>

                        <Text fontSize={12} fontWeight={300}>
                            Team Keplar
                        </Text>
                    </Stack>
                </Flex>
            </Flex>
            {/*<Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>*/}
            {/*    <PersonAvatar*/}
            {/*        firstName={person.person.firstName}*/}
            {/*        lastName={person.person.lastName}*/}
            {/*        iconUri={person.person.iconUri}*/}
            {/*        roles={person.roles}*/}
            {/*    />*/}
            {/*    <Divider />*/}
            {/*    {rolesEdit.isEditing ? (*/}
            {/*        <PersonRolesListEdit*/}
            {/*            domainId={domainId}*/}
            {/*            userId={userId}*/}
            {/*            roles={person.roles}*/}
            {/*            onSubmit={() => {*/}
            {/*                refetch();*/}
            {/*                rolesEdit.onClose();*/}
            {/*            }}*/}
            {/*            onCancel={rolesEdit.onClose}*/}
            {/*        />*/}
            {/*    ) : (*/}
            {/*        <PersonRolesList roles={person.roles} onEdit={rolesEdit.onEdit} />*/}
            {/*    )}*/}
            {/*    <Divider />*/}
            {/*    <PersonTeamsList teams={person.teams} />*/}
            {/*    <Divider />*/}
            {/*    {contactEdit.isEditing ? (*/}
            {/*        <PersonContactDetailsEdit*/}
            {/*            domainId={domainId}*/}
            {/*            userId={userId}*/}
            {/*            contact={person.contact}*/}
            {/*            onSubmit={() => {*/}
            {/*                refetch();*/}
            {/*                contactEdit.onClose();*/}
            {/*            }}*/}
            {/*            onCancel={contactEdit.onClose}*/}
            {/*        />*/}
            {/*    ) : (*/}
            {/*        <PersonContactDetails contact={person.contact} onEdit={contactEdit.onEdit} />*/}
            {/*    )}*/}
            {/*    <Divider />*/}
            {/*    {skillsEdit.isEditing ? (*/}
            {/*        <PersonSkillsListEdit*/}
            {/*            domainId={domainId}*/}
            {/*            userId={userId}*/}
            {/*            skills={person.skills}*/}
            {/*            onSubmit={() => {*/}
            {/*                refetch();*/}
            {/*                skillsEdit.onClose();*/}
            {/*            }}*/}
            {/*            onCancel={skillsEdit.onClose}*/}
            {/*        />*/}
            {/*    ) : (*/}
            {/*        <PersonSkillsList skills={person.skills} onEdit={skillsEdit.onEdit} />*/}
            {/*    )}*/}
            {/*</Flex>*/}
        </Flex>
    );
};
