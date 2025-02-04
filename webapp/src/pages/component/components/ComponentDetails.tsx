import { Box, Button, ButtonGroup, Flex, Link, Portal, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { IoInformation } from 'react-icons/io5';
import { format } from 'date-fns';
import { Component, DetailedComponent, EditComponentSubdomainData, Subdomain } from '@domaindocs/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverRoot,
    PopoverTrigger,
} from '../../../components/ui/popover';
import { FormSelect } from '../../../components/form/FormSelect';
import { PropsWithChildren, useState } from 'react';
import { componentsApi } from '../../../state/api/components-api';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { useNavigate } from 'react-router-dom';

type ComponentDetailsProps = {
    domainId: string;
    component: DetailedComponent;
};

export const ComponentDetails = (props: ComponentDetailsProps) => {
    const { domainId, component } = props;

    const [isHovering, setIsHovering] = useState(false);

    const navigate = useNavigate();

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={4} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} fontSize={16} backgroundColor={'pink.400'} rounded={6} p={2}>
                    <IoInformation color={'white'} />
                </Flex>

                <Text fontSize={18}>Details</Text>
            </Flex>

            <Flex direction={'column'} gap={2}>
                <Text fontSize={16} fontWeight={400}>
                    Date formed
                </Text>

                <Text fontSize={14} fontWeight={300}>
                    {format(component.component.dateCreated, 'Mo MMM yyyy')}
                </Text>
            </Flex>

            <Flex direction={'column'} alignItems={'start'}>
                <Text fontSize={16} fontWeight={400}>
                    Subdomain
                </Text>

                {component.subdomain ? (
                    <Flex
                        width={'100%'}
                        alignItems={'center'}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <Link
                            fontSize={14}
                            fontWeight={300}
                            href={`/${domainId}/subdomains/${component.subdomain.subdomainId}`}
                        >
                            {component.subdomain.name}
                        </Link>

                        <Box ml={'auto'} visibility={isHovering ? 'visible' : 'hidden'}>
                            <AssignSubdomainForm domainId={domainId} componentId={component.component.componentId}>
                                <EditIconButton variant={'ghost'} />
                            </AssignSubdomainForm>
                        </Box>
                    </Flex>
                ) : (
                    <AssignSubdomainForm domainId={domainId} componentId={component.component.componentId}>
                        <Button variant={'surface'} width={'fit'}>
                            Assign
                        </Button>
                    </AssignSubdomainForm>
                )}
            </Flex>
        </Flex>
    );
};

type AssignSubdomainFormProps = {
    domainId: string;
    componentId: string;
} & PropsWithChildren;

export const AssignSubdomainForm = (props: AssignSubdomainFormProps) => {
    const { domainId, componentId } = props;

    const menu = useDisclosure();

    const { data: allSubdomains, isLoading: isSubdomainsLoading } = useQuery<Subdomain[]>({
        queryKey: ['getAllSubdomains', { domainId }],
        queryFn: () => subdomainsApi.getAll(domainId),
    });

    const { mutateAsync: assignSubdomain } = useMutation<void, any, EditComponentSubdomainData>({
        mutationFn: (data) => componentsApi.updateSubdomain(domainId, componentId, data),
    });

    const form = useForm<EditComponentSubdomainData>({
        values: {
            subdomainId: '',
        },
        resolver: classValidatorResolver(EditComponentSubdomainData),
    });

    const close = () => {
        form.reset();
        menu.onClose();
    };

    const submit = async (data: EditComponentSubdomainData) => {
        await assignSubdomain(data);
        close();
    };

    return (
        <PopoverRoot
            open={menu.open}
            onOpenChange={(details: { open: boolean }) => {
                if (details.open) {
                    menu.onOpen();
                } else {
                    menu.onClose();
                }
            }}
        >
            <PopoverTrigger as={'div'}>{props.children}</PopoverTrigger>

            <Portal>
                <PopoverContent mr={2} backgroundColor={'white'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <FormSelect
                                name={'subdomainId'}
                                control={form.control}
                                isLoading={!allSubdomains || isSubdomainsLoading}
                                options={
                                    allSubdomains
                                        ? allSubdomains.map((subdomain) => ({
                                              label: `${subdomain.name}`,
                                              value: subdomain.subdomainId,
                                              subdomain,
                                          }))
                                        : []
                                }
                                label="Select subdomain"
                                isMulti={false}
                                components={{
                                    Option: (option: any) => {
                                        const subdomain = option.data.subdomain as Subdomain;

                                        return (
                                            <Flex
                                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                                p={2}
                                                onClick={() => {
                                                    option.selectOption(option);
                                                }}
                                            >
                                                <Text fontSize={14}>{subdomain.name}</Text>
                                            </Flex>
                                        );
                                    },
                                }}
                            />
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                    Cancel
                                </Button>

                                <Button colorPalette={'gray'} type={'submit'} loading={form.formState.isSubmitting}>
                                    Assign
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </PopoverRoot>
    );
};
