import { Avatar, Flex, Text } from '@chakra-ui/react';

type TeamAvatarProps = {
    name: string;
    nameLink?: boolean;
    iconUri?: string;
    subTitle?: string;
    small?: boolean;
};

export const TeamAvatar = (props: TeamAvatarProps) => {
    const { name, nameLink, subTitle, iconUri, small } = props;

    let avatarSize = 'md';
    let nameFontSize = 14;
    let subTitleSize = 12;

    if (small) {
        avatarSize = 'sm';
        nameFontSize = 12;
        subTitleSize = 10;
    }

    return (
        <Flex alignItems={'center'} gap={2}>
            <Avatar size={avatarSize} src={iconUri} name={name} rounded={8} />

            <Flex direction={'column'} justifyContent={'center'}>
                <Text
                    fontSize={nameFontSize}
                    _hover={nameLink === true ? { textDecoration: 'underline', cursor: 'pointer' } : undefined}
                >
                    {name}
                </Text>

                {subTitle && <Text fontSize={subTitleSize}>{subTitle}</Text>}
            </Flex>
        </Flex>
    );
};
