import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';

type PersonAvatarProps = {
    firstName: string;
    lastName: string;
    iconUri?: string;
    primaryRoleName?: string;
    small?: boolean;
    extraSmall?: boolean;
    displayRoles?: boolean;
};

export const PersonAvatar = (props: PersonAvatarProps) => {
    const { firstName, lastName, iconUri, primaryRoleName, displayRoles, small, extraSmall } = props;

    let avatarSize = 'md';
    let nameFontSize = 14;
    let roleFontSize = 12;

    if (small) {
        avatarSize = 'sm';
        nameFontSize = 12;
        roleFontSize = 10;
    }

    if (extraSmall) {
        avatarSize = 'xs';
        nameFontSize = 12;
        roleFontSize = 10;
    }

    return (
        <Flex alignItems={'center'}>
            <Avatar size={avatarSize} src={iconUri} name={`${firstName} ${lastName}`} />

            <Flex ml={2} direction={'column'} justifyContent={'center'}>
                <Text fontSize={nameFontSize} fontWeight={'normal'}>
                    {firstName} {lastName}
                </Text>

                {displayRoles !== false && (
                    <Box>
                        {primaryRoleName ? (
                            <Text fontSize={roleFontSize}>{primaryRoleName}</Text>
                        ) : (
                            <Badge colorScheme={'orange'} fontSize={roleFontSize}>
                                No Roles
                            </Badge>
                        )}
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};
