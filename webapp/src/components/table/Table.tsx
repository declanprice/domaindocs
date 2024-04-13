import {
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'

type TableProps<Data> = {
    data: Data[]
    fields: {
        name: string
        render: (data: Data) => any
        onClick: (data: Data) => void
    }[]
}

export const Table = (props: TableProps<any>) => {
    const {} = props

    return (
        <TableContainer>
            <ChakraTable size="sm">
                <Thead>
                    <Tr>
                        <Th
                            fontSize={12}
                            fontWeight={'normal'}
                            color={'gray.900'}
                            textTransform={'none'}
                            letterSpacing={'normal'}
                            borderTop={'1px solid'}
                            borderColor={'gray.100'}
                        >
                            Person
                        </Th>
                        <Th
                            fontSize={12}
                            fontWeight={'normal'}
                            color={'gray.900'}
                            textTransform={'none'}
                            letterSpacing={'normal'}
                            borderTop={'1px solid'}
                            borderColor={'gray.100'}
                        >
                            Subdomains
                        </Th>
                        <Th
                            fontSize={12}
                            fontWeight={'normal'}
                            color={'gray.900'}
                            textTransform={'none'}
                            letterSpacing={'normal'}
                            borderTop={'1px solid'}
                            borderColor={'gray.100'}
                        >
                            {' '}
                            Teams
                        </Th>
                        <Th
                            fontSize={12}
                            fontWeight={'normal'}
                            color={'gray.900'}
                            textTransform={'none'}
                            letterSpacing={'normal'}
                            borderTop={'1px solid'}
                            borderColor={'gray.100'}
                        >
                            Skills
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Sam Johns
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Supporting
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Team Orion | Team Keplar
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Javascript | Node.js | AWS
                        </Td>
                    </Tr>

                    <Tr>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Bob Dylan
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Supporting
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Team Keplar
                        </Td>
                        <Td fontSize={12} fontWeight={'regular'}>
                            Javascript | Node.js | AWS
                        </Td>
                    </Tr>
                </Tbody>
            </ChakraTable>
        </TableContainer>
    )
}
