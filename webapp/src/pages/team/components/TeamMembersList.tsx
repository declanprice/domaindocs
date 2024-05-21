import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { TeamMember } from '@domaindocs/lib';
import { PersonAvatar } from '../../../components/person/PersonAvatar';

type TeamMembersListProps = {
    members: TeamMember[];
};

export const TeamMembersList = (props: TeamMembersListProps) => {
    const { members } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Members</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={4}>
                {members.map((member: TeamMember) => (
                    <ListItem>
                        <PersonAvatar
                            small
                            firstName={member.firstName}
                            lastName={member.lastName}
                            iconUri={member.iconUri}
                            roles={member.roles}
                        />
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
