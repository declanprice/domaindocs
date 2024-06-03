import { Divider, Flex } from '@chakra-ui/react';
import { FormsPageToolbar } from './FormsPageToolbar';
import { YourForms } from './components/YourForms';
import { YourSubmissions } from './components/YourSubmissions';
import { AllForms } from './components/AllForms';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';

export const FormsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            <FormsPageToolbar />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={6}>
                <YourForms />

                <Divider />

                <YourSubmissions />

                <Divider />

                <AllForms domainId={domainId} />
            </Flex>
        </Flex>
    );
};
