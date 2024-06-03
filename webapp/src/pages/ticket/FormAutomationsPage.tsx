import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { AutomationsRulesList } from '../../components/automations/AutomationsRulesList';
import { FormPageParams } from './FormPageParams';
import { FormPageToolbar } from './FormPageToolbar';

export const FormAutomationsPage = () => {
    const { domainId, formId } = useParams() as FormPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            <FormPageToolbar domainId={domainId} formId={formId} />

            <Flex direction="column" width={'100%'} p={6}>
                <AutomationsRulesList />
            </Flex>
        </Flex>
    );
};
