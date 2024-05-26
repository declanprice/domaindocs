import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { FormPageToolbar } from './FormPageToolbar';
import { FormPageParams } from './FormPageParams';

export const FormOverviewPage = () => {
    const { domainId, formId } = useParams() as FormPageParams;

    return (
        <Flex direction="column" width={'100%'}>
            <FormPageToolbar domainId={domainId} formId={formId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <Stack spacing={4}>
                    <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                        Deed Search Bug
                    </Heading>
                </Stack>
            </Flex>
        </Flex>
    );
};
