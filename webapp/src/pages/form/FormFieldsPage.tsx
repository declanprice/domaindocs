import { useParams } from 'react-router-dom';
import { FormPageParams } from './FormPageParams';
import { Flex } from '@chakra-ui/react';
import { FormPageToolbar } from './FormPageToolbar';
import React from 'react';

export const FormFieldsPage = () => {
    const { domainId, formId } = useParams() as FormPageParams;

    return (
        <Flex width={'100%'} direction={'column'} overflowY={'auto'}>
            <FormPageToolbar domainId={domainId} formId={formId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={6}>
                content
            </Flex>
        </Flex>
    );
};
