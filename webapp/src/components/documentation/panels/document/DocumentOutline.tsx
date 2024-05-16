import { MdLastPage } from 'react-icons/md';
import { Flex, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

export const DocumentOutline = () => {
    const [] = useState<string[]>([]);

    return (
        <Flex minWidth="125px">
            <IconButton variant={'ghost'} aria-label={'open'} icon={<MdLastPage color={'gray.900'} size={18} />} />
        </Flex>
    );
};
