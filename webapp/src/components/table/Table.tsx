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
            <ChakraTable size="md" {...props}>
                <Thead>
                    <Tr>
                        {fields.map(({ label }) => (
                            <Th
                                py={2}
                                key={label}
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
                        <Tr key={v4()}>
                            {fields.map((f) => (
                                <Td
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
