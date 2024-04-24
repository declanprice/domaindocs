import { Box, IconButton } from '@chakra-ui/react';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
export const DocumentSettingsSidebarActions = () => {
    return (
        <Box position={'absolute'} right={0}>
            <IconButton
                variant={'ghost'}
                size={'lg'}
                aria-label="open-document-sidebar"
                icon={<TbLayoutSidebarRightExpand color={'gray.100'} />}
            ></IconButton>
        </Box>
    );
};
