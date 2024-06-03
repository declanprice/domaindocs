import {
    Table as ChakraTable,
    TableProps as ChakraTableProps,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import { v4 } from 'uuid';

type TableProps<Data> = {
    data: Data[];
    size?: string;
    fields: {
        label: string;
        render: (data: Data) => any;
        onClick: (data: Data) => void;
    }[];
} & Partial<ChakraTableProps>;

export const Table = (props: TableProps<any>) => {
    const { data, fields } = props;

    return (
        <TableContainer>
            <ChakraTable size={'sm'} {...props}>
                <Thead>
                    <Tr>
                        {fields.map(({ label }) => (
                            <Th
                                py={2}
                                key={label}
                                fontWeight={'400'}
                                color={'gray.900'}
                                textTransform={'none'}
                                letterSpacing={'normal'}
                            >
                                {label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody borderBottom={'1px solid'} borderColor={'border'}>
                    {data.map((_, index) => (
                        <Tr key={v4()} _hover={{ backgroundColor: 'gray.100' }}>
                            {fields.map((f) => (
                                <Td
                                    borderBottom={'none'}
                                    key={v4()}
                                    fontSize={12}
                                    fontWeight={'regular'}
                                    onClick={() => {
                                        f.onClick(data[index]);
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
    );
};
