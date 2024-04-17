import { Box, Flex } from '@chakra-ui/react';
import { SubdomainPageToolbar } from './SubdomainPageToolbar';
import { Outlet } from 'react-router-dom';

export const SubdomainProjectsPage = () => {
  return (
    <Flex direction="column" width={'100%'}>
      <SubdomainPageToolbar />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        projects
      </Box>
    </Flex>
  );
};
