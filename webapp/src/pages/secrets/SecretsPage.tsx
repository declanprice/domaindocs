import { Box, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Secret } from '@domaindocs/lib';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SecretsPageToolbar } from './SecretsPageToolbar';
import { secretsApi } from '../../state/api/secrets-api';
import { TableToolbar } from '../../components/table/TableToolbar';
import { SecretTable } from '../../components/secret/SecretTable';

export const SecretsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: secrets, isLoading } = useQuery<Secret[]>({
        queryKey: ['searchSecrets', { domainId }],
        queryFn: () => secretsApi.searchSecrets(domainId),
    });

    if (!secrets || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <SecretsPageToolbar domainId={domainId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Stack>
                        <TableToolbar
                            title={`Secrets (${secrets.length})`}
                            onSearch={() => {}}
                            onFilterClick={() => {}}
                        />

                        <SecretTable
                            secrets={secrets}
                            onSecretClick={(secret: Secret) => {
                                console.log('clicked secret', secret);
                            }}
                        />
                    </Stack>
                </Flex>
            </Box>
        </Flex>
    );
};
