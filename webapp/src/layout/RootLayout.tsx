import { Flex } from '@chakra-ui/react';
import { HeadingToolbar } from './HeadingToolbar';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const RootLayout = () => {
  return (
    <Flex direction={'column'} height={'inherit'} overflow={'hidden'}>
      <HeadingToolbar />
      <Flex height={'inherit'}>
        <NavBar />
        <Outlet />
      </Flex>
    </Flex>
  );
};
