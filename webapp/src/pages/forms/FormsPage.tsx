import { Divider, Flex } from '@chakra-ui/react';
import { FormsPageToolbar } from './FormsPageToolbar';
import { YourForms } from './components/YourForms';
import { YourSubmissions } from './components/YourSubmissions';
import { AllForms } from './components/AllForms';

export const FormsPage = () => {
    return (
        <Flex direction="column" width={'100%'}>
            <FormsPageToolbar />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={6}>
                <YourForms />

                <Divider />

                <YourSubmissions />

                <Divider />

                <AllForms />
            </Flex>
        </Flex>
    );
};
