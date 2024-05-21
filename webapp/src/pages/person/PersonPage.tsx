import { Divider, Flex } from '@chakra-ui/react';
import { PersonRolesList } from './components/PersonRolesList';
import { PersonTeamsList } from './components/PersonTeamsList';
import { PersonContactDetails } from './components/PersonContactDetails';
import { PersonPageToolbar } from './PersonPageToolbar';
import { DetailedPerson } from '@domaindocs/lib';
import { useParams } from 'react-router-dom';
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

export const PersonPage = () => {
    const { domainId, userId } = useParams() as PersonPageParams;

    const skillsEdit = useEditable();
    const contactEdit = useEditable();
    const rolesEdit = useEditable();

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
        <Flex direction="column" width={'100%'}>
            <PersonPageToolbar domainId={domainId} person={person.person} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <PersonAvatar
                    firstName={person.person.firstName}
                    lastName={person.person.lastName}
                    iconUri={person.person.iconUri}
                    roles={person.roles}
                />

                <Divider />

                {rolesEdit.isEditing ? (
                    <PersonRolesListEdit
                        domainId={domainId}
                        userId={userId}
                        roles={person.roles}
                        onSubmit={() => {
                            refetch();
                            rolesEdit.onClose();
                        }}
                        onCancel={rolesEdit.onClose}
                    />
                ) : (
                    <PersonRolesList roles={person.roles} onEdit={rolesEdit.onEdit} />
                )}

                <Divider />

                <PersonTeamsList teams={person.teams} />

                <Divider />

                {contactEdit.isEditing ? (
                    <PersonContactDetailsEdit
                        domainId={domainId}
                        userId={userId}
                        contact={person.contact}
                        onSubmit={() => {
                            refetch();
                            contactEdit.onClose();
                        }}
                        onCancel={contactEdit.onClose}
                    />
                ) : (
                    <PersonContactDetails contact={person.contact} onEdit={contactEdit.onEdit} />
                )}

                <Divider />

                {skillsEdit.isEditing ? (
                    <PersonSkillsListEdit
                        domainId={domainId}
                        userId={userId}
                        skills={person.skills}
                        onSubmit={() => {
                            refetch();
                            skillsEdit.onClose();
                        }}
                        onCancel={skillsEdit.onClose}
                    />
                ) : (
                    <PersonSkillsList skills={person.skills} onEdit={skillsEdit.onEdit} />
                )}
            </Flex>
        </Flex>
    );
};
