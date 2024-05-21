import { Avatar, Badge, Box, Flex, Stack, Text, Tooltip } from '@chakra-ui/react';
import { PersonRole } from '@domaindocs/lib';

type PersonAvatarProps = {
    firstName: string;
    lastName: string;
    iconUri?: string;
    roles?: PersonRole[];
    small?: boolean;
    extraSmall?: boolean;
    displayRoles?: boolean;
};

export const PersonAvatar = (props: PersonAvatarProps) => {
    const { firstName, lastName, iconUri, roles, displayRoles, small, extraSmall } = props;

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
                        {roles?.length ? (
                            <>
                                {roles.length > 1 ? (
                                    <Tooltip
                                        backgroundColor={'white'}
                                        label={roles.map((r) => (
                                            <Stack spacing={4}>
                                                <Text my={1} fontSize={roleFontSize} color={'gray.900'}>
                                                    {r.roleName}
                                                </Text>
                                            </Stack>
                                        ))}
                                    >
                                        <Text fontSize={roleFontSize}>{roles.length} Roles</Text>
                                    </Tooltip>
                                ) : (
                                    <Text fontSize={roleFontSize}>{roles[0].roleName}</Text>
                                )}
                            </>
                        ) : (
                            <Badge fontSize={roleFontSize}>No Roles</Badge>
                        )}
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};
