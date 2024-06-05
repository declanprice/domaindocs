import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DomainPageParams } from '../../types/DomainPageParams';
import { componentsApi } from '../../state/api/components-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ComponentTable } from './components/ComponentTable';
import { SearchComponent } from '@domaindocs/types';
import { FormTextInput } from '../../components/form/FormTextInput';
import { CiSearch } from 'react-icons/ci';
import { PeopleTable } from '../people/components/PeopleTable';
import { useForm } from 'react-hook-form';

export const ComponentsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: components, isLoading } = useQuery<SearchComponent[]>({
        queryKey: ['searchComponents', { domainId }],
        queryFn: () => componentsApi.searchComponents(domainId, {}),
    });

    const form = useForm({
        values: {
            name: '',
        },
    });

    if (!components || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4}>
            <Flex alignItems={'center'}>
                <Heading variant={'h2'} fontSize={18} fontWeight={400}>
                    Components
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    Create Component
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for components across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Box maxWidth={'180px'}>
                    <FormTextInput
                        name={'name'}
                        control={form.control}
                        placeholder={'Search components'}
                        leftElement={<CiSearch />}
                    />
                </Box>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Type</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Owner Team</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Subdomain</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Labels</Text>
                </Button>
            </Flex>

            <ComponentTable
                domainId={domainId}
                components={components}
                onComponentClick={(component: SearchComponent) => {
                    navigate(`/${domainId}/components/${component.component.componentId}`);
                }}
            />
        </Flex>
    );
};
