import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import { TeamMember } from '@domaindocs/lib';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type TeamMembersListProps = {
    members: TeamMember[];
    onEdit: () => void;
};

export const TeamMembersList = (props: TeamMembersListProps) => {
    const { members } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Members</Text>

                <EditIconButton marginLeft={'auto'} onClick={props.onEdit} />
            </Flex>

            <List spacing={4}>
                {members.map((member: TeamMember) => (
                    <ListItem key={member.userId}>
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
