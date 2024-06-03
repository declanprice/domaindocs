import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';

export const DomainSubdomainsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                subdomains
            </Box>
        </Flex>
    );
};
