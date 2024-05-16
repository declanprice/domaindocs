import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Team } from '@domaindocs/lib';

type TeamAvatarProps = {
    team: Team;
    small?: boolean;
};

export const TeamAvatar = (props: TeamAvatarProps) => {
    const { team, small } = props;

    let avatarSize = 'md';
    let nameFontSize = 14;

    if (small) {
        avatarSize = 'sm';
        nameFontSize = 12;
    }

    return (
        <Flex alignItems={'center'} mb={4} gap={2}>
            <Avatar size={avatarSize} src={team.iconUri} name={team.name} rounded={8} />

            <Text fontSize={nameFontSize}>{team.name}</Text>
        </Flex>
    );
};
