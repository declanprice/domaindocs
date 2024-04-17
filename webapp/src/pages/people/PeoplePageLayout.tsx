import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { PeoplePageToolbar } from './PeoplePageToolbar';

export const PeoplePageLayout = () => {
  return (
    <Flex direction="column" width={'100%'}>
      <PeoplePageToolbar />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        <Outlet />
      </Box>
    </Flex>
  );
};
