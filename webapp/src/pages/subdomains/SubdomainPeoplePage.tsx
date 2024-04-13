import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { Table } from '@components/table/Table.tsx'

export const SubdomainPeoplePage = () => {
    return (
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
            <Stack>
                <TableToolbar
                    title={'Supporting People (3)'}
                    onSearch={() => {}}
                    onFilterClick={() => {}}
                />

                <Table data={[]} fields={[]} />
            </Stack>
        </Flex>
    )
}
