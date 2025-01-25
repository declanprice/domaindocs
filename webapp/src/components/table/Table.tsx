import { Table as ChakraTable } from '@chakra-ui/react';

import { v4 } from 'uuid';

type TableProps<Data> = {
    data: Data[];
    size?: string;
    fields: {
        label: string;
        headerAlign?: 'left' | 'center' | 'end' | 'right' | 'start';
        columnWidth?: string;
        render: (data: Data) => any;
        onClick: (data: Data) => void;
    }[];
};

export const Table = (props: TableProps<any>) => {
    const { data, fields } = props;

    return (
        <ChakraTable.Root>
            <ChakraTable.Header>
                <ChakraTable.Row>
                    {fields.map(({ label, headerAlign }) => (
                        <ChakraTable.ColumnHeader
                            py={2}
                            key={label}
                            fontWeight={'400'}
                            color={'gray.900'}
                            textTransform={'none'}
                            letterSpacing={'normal'}
                            textAlign={headerAlign || 'start'}
                        >
                            {label}
                        </ChakraTable.ColumnHeader>
                    ))}
                </ChakraTable.Row>
            </ChakraTable.Header>
            <ChakraTable.Body borderBottom={'1px solid'} borderColor={'border'}>
                {data.map((_, index) => (
                    <ChakraTable.Row key={v4()} _hover={{ backgroundColor: 'gray.100' }}>
                        {fields.map((f) => (
                            <ChakraTable.Cell
                                width={f?.columnWidth}
                                maxWidth={f?.columnWidth}
                                borderBottom={'none'}
                                key={v4()}
                                fontSize={12}
                                fontWeight={'regular'}
                                onClick={() => {
                                    f.onClick(data[index]);
                                }}
                            >
                                {f.render(data[index])}
                            </ChakraTable.Cell>
                        ))}
                    </ChakraTable.Row>
                ))}
            </ChakraTable.Body>
        </ChakraTable.Root>
    );
};
