import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { Flex, Text } from '@chakra-ui/react'
import { TbUsersGroup } from 'react-icons/tb'

export const TeamsPageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <TbUsersGroup color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Teams
                    </Text>
                </Flex>
            }
            actions={[
                {
                    label: 'New Team',
                    onClick: async () => {},
                },
            ]}
        />
    )
}
