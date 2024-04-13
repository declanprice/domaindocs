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
        label: string
        name: string
        render: (data: Data) => any
        onClick: (data: Data) => void
    }[]
}

export const Table = (props: TableProps<any>) => {
    const { data, fields } = props

    return (
        <TableContainer>
            <ChakraTable size="sm">
                <Thead>
                    <Tr>
                        {fields.map(({ label }) => (
                            <Th
                                fontSize={12}
                                fontWeight={'normal'}
                                color={'gray.900'}
                                textTransform={'none'}
                                letterSpacing={'normal'}
                                borderTop={'1px solid'}
                                borderColor={'gray.100'}
                            >
                                {label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((_, index) => (
                        <Tr>
                            {fields.map((f) => (
                                <Td
                                    fontSize={12}
                                    fontWeight={'regular'}
                                    onClick={() => {
                                        f.onClick(data[index])
                                    }}
                                >
                                    {f.render(data[index])}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    )
}
