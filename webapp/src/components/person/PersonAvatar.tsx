import {
    Avatar,
    Badge,
    Box,
    Flex,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { PersonRole } from '@domaindocs/lib';

type PersonAvatarProps = {
    firstName?: string;
    lastName?: string;
    subTitle?: any;
    iconUri?: string;
    roles?: { roleId: string; roleName: string }[];
    small?: boolean;
    extraSmall?: boolean;
    displayRoles?: boolean;
};

export const PersonAvatar = (props: PersonAvatarProps) => {
    const { firstName, lastName, subTitle, iconUri, roles, displayRoles, small, extraSmall } = props;

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

    const renderRoles = () => {
        if (!roles?.length) {
            return <Text fontSize={roleFontSize}>Employee</Text>;
        }

        if (roles.length === 1) {
            const role = roles[0];
            return <Text fontSize={roleFontSize}>{role.roleName}</Text>;
        }

        return (
            <Popover>
                <PopoverTrigger>
                    <Text
                        _hover={{ textDecoration: 'underline' }}
                        cursor={'pointer'}
                        fontSize={roleFontSize}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {roles.length} Roles
                    </Text>
                </PopoverTrigger>
                <PopoverContent backgroundColor={'lightgray'}>
                    <PopoverBody>
                        <Stack spacing={2}>
                            {roles.map((r) => (
                                <Text key={r.roleId} fontSize={12}>
                                    {r.roleName}
                                </Text>
                            ))}
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <Flex alignItems={'center'} gap={2}>
            <Avatar size={avatarSize} src={iconUri} name={`${firstName} ${lastName}`} />

            <Flex direction={'column'} justifyContent={'center'}>
                <Text fontSize={nameFontSize} fontWeight={'normal'}>
                    {firstName} {lastName}
                </Text>

                {subTitle && <>{subTitle}</>}

                {displayRoles !== false && <>{renderRoles()}</>}
            </Flex>
        </Flex>
    );
};
