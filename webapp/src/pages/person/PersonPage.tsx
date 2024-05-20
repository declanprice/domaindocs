import { Divider, Flex } from '@chakra-ui/react';
import { PersonRolesList } from './components/PersonRolesList';
import { PersonTeamsList } from './components/PersonTeamsList';
import { PersonContactDetails } from './components/PersonContactDetails';
import { PersonSkillsList } from './components/PersonSkillsList';
import { PersonPageToolbar } from './PersonPageToolbar';
import { DetailedPerson } from '@domaindocs/lib';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { PersonAvatar } from '../../components/person/PersonAvatar';
import { PersonSkillsListEdit } from './components/PersonSkillsListEdit';

export const PersonPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const person: DetailedPerson = {
        person: {
            userId: '1',
            iconUri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
            firstName: 'Declan',
            lastName: 'Declan',
            primaryRoleName: 'Software Developer',
        },
        contact: {
            personalEmail: 'declan@declan.com',
            personalMobile: '0123456789',
            workEmail: 'declan@declan.com',
            workMobile: '0123456789',
        },
        roles: [
            {
                roleId: '1',
                roleName: 'Software Developer',
            },
            {
                roleId: '2',
                roleName: 'Team Lead',
            },
        ],
        teams: [
            {
                teamId: '1',
                teamName: 'Team Orion',
                teamIconUri:
                    'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/MEKSa34K4uDh8463uR.png?Expires=1715400265&Signature=WyHoS2OXenVLWkCPcBeaMd1OWQIlYG6FO5~Aso6sm3T9tHj6dcAbUtzu9~MHkseBJJhfckT7Ec~93qRQ7yWXP5wSCQu-1KJunIfutYmDXsnKkKAsaYmL~o1ohqhTHoKoZiRkoU2Qszjf64Cnx82x~Fkvxc-KKGPxsEdPybdyuksAscaP2cV5CjJ2bJpxDZF5Ux1fhktSIedursdHQxaTPZ3sITOG0twjR6fyhs3cWjNTvo76fLdP0KTb5E2jlgMoPHMKZBeL8~F9QOAB7vvLa6maXTEA~lj8ug0KYPDbqRUeY2O7nujE3MK-kFMLmfc2tnFQ5EeJ1LqKiI763W8XoQ__&Key-Pair-Id=K2YEDJLVZ3XRI',
            },
            {
                teamId: '2',
                teamName: 'Team Keplar',
                teamIconUri:
                    'https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/MEKSa34K4uDh8463uR.png?Expires=1715400265&Signature=WyHoS2OXenVLWkCPcBeaMd1OWQIlYG6FO5~Aso6sm3T9tHj6dcAbUtzu9~MHkseBJJhfckT7Ec~93qRQ7yWXP5wSCQu-1KJunIfutYmDXsnKkKAsaYmL~o1ohqhTHoKoZiRkoU2Qszjf64Cnx82x~Fkvxc-KKGPxsEdPybdyuksAscaP2cV5CjJ2bJpxDZF5Ux1fhktSIedursdHQxaTPZ3sITOG0twjR6fyhs3cWjNTvo76fLdP0KTb5E2jlgMoPHMKZBeL8~F9QOAB7vvLa6maXTEA~lj8ug0KYPDbqRUeY2O7nujE3MK-kFMLmfc2tnFQ5EeJ1LqKiI763W8XoQ__&Key-Pair-Id=K2YEDJLVZ3XRI',
            },
        ],
        skills: [
            {
                skillId: '1',
                skillName: 'Node.Js',
            },
            {
                skillId: '2',
                skillName: 'Dev Ops',
            },
            {
                skillId: '3',
                skillName: 'AWS',
            },
        ],
    };

    return (
        <Flex direction="column" width={'100%'}>
            <PersonPageToolbar domainId={domainId} person={person.person} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <PersonAvatar {...person.person} />

                <Divider />

                <PersonRolesList roles={person.roles} />

                <Divider />

                <PersonTeamsList teams={person.teams} />

                <Divider />

                <PersonContactDetails contact={person.contact} />

                <Divider />

                <PersonSkillsListEdit skills={person.skills} />
                {/*<PersonSkillsList skills={person.skills} />*/}
            </Flex>
        </Flex>
    );
};
