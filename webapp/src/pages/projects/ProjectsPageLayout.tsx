import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { ProjectsPageToolbar } from './ProjectsPageToolbar';

export const ProjectsPageLayout = () => {
  return (
    <Flex direction="column" width={'100%'}>
      <ProjectsPageToolbar />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        <Outlet />
      </Box>
    </Flex>
  );
};
