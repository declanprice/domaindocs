import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { PersonPageParams } from './PersonPageParams';

export const PersonWorkPage = () => {
    const { domainId, userId } = useParams() as PersonPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            work
        </Flex>
    );
};
