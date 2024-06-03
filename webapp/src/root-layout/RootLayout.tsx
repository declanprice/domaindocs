import { Flex } from '@chakra-ui/react';
import { HeadingToolbar } from './HeadingToolbar';
import { Outlet } from 'react-router-dom';

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
            </Flex>
        </Flex>
    );
};
