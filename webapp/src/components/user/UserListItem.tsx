import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

type UserListItemProps = {
    firstName: string
    lastName: string
    roleName?: string
    iconUri?: string
}

export const UserListItem = (props: UserListItemProps) => {
    const { firstName, lastName, roleName, iconUri } = props

    return (
        <Flex alignItems="center">
            <Avatar
                size={'sm'}
                src={iconUri}
                name={`${firstName} ${lastName}`}
            />
            <Box ml="3">
                <Text fontWeight="regular" fontSize={14}>
                    {firstName} {lastName}
                </Text>
                <Text fontSize={12}>{roleName}</Text>
            </Box>
        </Flex>
    )
}
