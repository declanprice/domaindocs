import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';

type TeamAvatarProps = {
    name: string;
    iconUri?: string;
    subTitle?: string;
    small?: boolean;
};

export const TeamAvatar = (props: TeamAvatarProps) => {
    const { name, subTitle, iconUri, small } = props;

    let avatarSize = 'md';
    let nameFontSize = 14;
    let subTitleSize = 12;

    if (small) {
        avatarSize = 'sm';
        nameFontSize = 12;
        subTitleSize = 10;
    }

    return (
        <Flex alignItems={'center'} mb={4} gap={2}>
            <Avatar size={avatarSize} src={iconUri} name={name} rounded={8} />

            <Stack spacing={1}>
                <Text fontSize={nameFontSize}>{name}</Text>

                {subTitle && <Text fontSize={subTitleSize}>{subTitle}</Text>}
            </Stack>
        </Flex>
    );
};
