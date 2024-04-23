import { Table } from '../table/Table';
import { File } from '@domaindocs/lib';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

type FileTableProps = {
    files: File[];
    onFileClick: (file: File) => void;
};

export const FileTable = (props: FileTableProps) => {
    const { files, onFileClick } = props;

    return (
        <Table
            data={files}
            fields={[
                {
                    label: 'File name',
                    render: (data: File) => (
                        <Flex alignItems="center" gap={2}>
                            <Box width="24px" height="24px">
                                <Image
                                    src={
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/.doc_icon_%282000-03%29.svg/2093px-.doc_icon_%282000-03%29.svg.png'
                                    }
                                    alt={''}
                                />
                            </Box>

                            <Text> {data.name}</Text>
                        </Flex>
                    ),
                    onClick: (file) => {
                        onFileClick(file);
                    },
                },

                {
                    label: 'Type',
                    render: (data: File) => `${data.type}`,
                    onClick: (file) => {
                        onFileClick(file);
                    },
                },
            ]}
        />
    );
};
