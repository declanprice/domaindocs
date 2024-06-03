import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Flex,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { PersonRolesList } from './components/PersonRolesList';
import { PersonTeamsList } from './components/PersonTeamsList';
import { PersonContactDetails } from './components/PersonContactDetails';
import { DetailedPerson } from '@domaindocs/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonAvatar } from '../../components/person/PersonAvatar';
import { PersonSkillsListEdit } from './components/PersonSkillsListEdit';
import { PersonPageParams } from './PersonPageParams';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { useEditable } from '../../hooks/useEditable';
import { PersonSkillsList } from './components/PersonSkillsList';
import { PersonRolesListEdit } from './components/PersonRolesListEdit';
import { PersonContactDetailsEdit } from './components/PersonContactDetailsEdit';
import { IoInformation } from 'react-icons/io5';
import { GrWorkshop } from 'react-icons/gr';
import { GiSkills } from 'react-icons/gi';
import { GoPeople } from 'react-icons/go';
import { MdConnectWithoutContact, MdEmail, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';

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
                <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
                    <Flex alignItems={'center'} gap={4}>
                        <Flex alignItems={'center'} backgroundColor={'pink.400'} rounded={6} p={2}>
                            <IoInformation color={'white'} />
                        </Flex>

                        <Text>Information</Text>
                    </Flex>

                    <Stack spacing={0}>
                        <Text fontSize={12} fontWeight={300}>
                            Subdomain
                        </Text>

                        <Text fontSize={12} fontWeight={400}>
                            Supporting
                        </Text>
                    </Stack>

                    <Stack spacing={0}>
                        <Text fontSize={12} fontWeight={300}>
                            Date joined
                        </Text>

                        <Text fontSize={12} fontWeight={400}>
                            13th May 2023
                        </Text>
                    </Stack>
                </Flex>

                <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
                    <Flex alignItems={'center'} gap={4}>
                        <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                            <GrWorkshop color={'white'} />
                        </Flex>

                        <Text>Roles</Text>
                    </Flex>

                    <Stack spacing={0}>
                        <Text fontSize={12} fontWeight={300}>
                            Primary
                        </Text>

                        <Text fontSize={12} fontWeight={400}>
                            Team Leader
                        </Text>
                    </Stack>

                    <Stack spacing={0}>
                        <Text fontSize={12} fontWeight={300}>
                            Secondary
                        </Text>

                        <Text fontSize={12} fontWeight={400}>
                            Software Developer
                        </Text>
                    </Stack>
                </Flex>

                <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
                    <Flex alignItems={'center'} gap={4}>
                        <Flex alignItems={'center'} backgroundColor={'blue.400'} rounded={6} p={2}>
                            <GiSkills color={'white'} />
                        </Flex>

                        <Text>Skills</Text>
                    </Flex>

                    <Wrap>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Node.js
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            AWS
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Typescript
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            React
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Angular
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Nest.js
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Nest.js
                        </WrapItem>
                        <WrapItem fontSize={12} fontWeight={300}>
                            Nest.js
                        </WrapItem>
                    </Wrap>
                </Flex>

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
