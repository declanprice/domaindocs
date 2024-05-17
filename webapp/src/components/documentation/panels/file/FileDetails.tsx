import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { MdOutlineUpdate, MdOutlineWbSunny } from 'react-icons/md';
import { format } from 'date-fns';

type DocumentDetailsProps = {
    createdAt: string;
    updatedAt: string;
    createdBy: {
        firstName: string;
        lastName: string;
        iconUri?: string;
    };
};

export const FileDetails = (props: DocumentDetailsProps) => {
    const { createdAt, updatedAt, createdBy } = props;

    return (
        <Flex maxWidth={'900px'} width={'100%'} alignItems={'center'} gap={4}>
            <Flex alignItems={'center'} gap={1}>
                <MdOutlineWbSunny size={18} />
                <Text fontSize={12}>Created {format(createdAt, 'wo MMM yyyy, p')}</Text>
            </Flex>

            <Flex alignItems={'center'} gap={1}>
                <MdOutlineUpdate size={18} />
                <Text fontSize={12}>Updated {format(createdAt, 'wo MMM yyyy, p')}</Text>
            </Flex>

            <Button variant={'ghost'}>
                <Avatar size={'xs'} src={createdBy.iconUri} name={`${createdBy.firstName} ${createdBy.lastName}`} />

                <Flex ml={2} gap={1} alignItems={'center'}>
                    <Text fontSize={12} fontWeight={'bold'}>
                        Created By
                    </Text>
                    <Text fontSize={12} fontWeight={'normal'}>
                        {createdBy.firstName}
                    </Text>
                </Flex>
            </Button>
        </Flex>
    );
};
