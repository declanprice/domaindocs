import { Flex } from '@chakra-ui/react';
import { HeadingToolbar } from './HeadingToolbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';

type RootLayoutProps = {
    navbar: any;
};

export const RootLayout = (props: RootLayoutProps) => {
    return (
        <Flex direction={'column'} height={'inherit'} overflow={'hidden'}>
            <HeadingToolbar />

            <Flex height={'inherit'}>
                {props.navbar}

                <Outlet />

                <Toaster />
            </Flex>
        </Flex>
    );
};
