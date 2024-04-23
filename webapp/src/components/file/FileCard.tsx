import { File } from '@domaindocs/lib';
import { Image, Box, Card, CardBody, Text, Flex } from '@chakra-ui/react';

type FileCardProps = {
    file: File;
};

export const FileCard = (props: FileCardProps) => {
    const { file } = props;
    return (
        <Card boxShadow="xs" width={'180px'} _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
            <CardBody p={2}>
                <Flex alignItems="center" direction="column" justifyContent="center">
                    <Text fontSize={12}>{file.project.subdomainName}</Text>
                    <Text fontSize={12}>{file.project.projectName}</Text>

                    <Box width="40px" height="40px" my={2}>
                        <Image
                            src={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv3qczswxiDVO0twxBealS6lUxxOOm5rrnRrTbRoMjKA&s'
                            }
                            alt={''}
                        />
                    </Box>

                    <Text fontSize={14}>{file.name}</Text>
                </Flex>
            </CardBody>
        </Card>
    );
};
