import { Box, Button, ButtonGroup, Flex, Link, Portal, Text, useDisclosure } from '@chakra-ui/react';
import { DetailedComponent, EditComponentOwnershipData, Team } from '@domaindocs/types';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { teamsApi } from '../../../state/api/teams-api';
import { GoPeople } from 'react-icons/go';

type ComponentOwnerTeamProps = {
    domainId: string;
    component: DetailedComponent;
};

export const ComponentOwnerTeam = (props: ComponentOwnerTeamProps) => {
    const { domainId, component } = props;

    const [isHovering, setIsHovering] = useState(false);

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={4} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} fontSize={16} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <GoPeople color={'white'} />
                </Flex>

                <Text fontSize={18}>Owner Team</Text>
            </Flex>

            <Flex direction={'column'} alignItems={'start'}>
                {component.team ? (
                    <Flex
                        width={'100%'}
                        alignItems={'center'}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <Link fontSize={14} fontWeight={300} href={`/${domainId}/teams/${component.team.teamId}`}>
                            {component.team.name}
                        </Link>

                        <Box ml={'auto'} visibility={isHovering ? 'visible' : 'hidden'}>
                            <AssignOwnerTeamForm domainId={domainId} component={component}>
                                <EditIconButton variant={'ghost'} />
                            </AssignOwnerTeamForm>
                        </Box>
                    </Flex>
                ) : (
                    <AssignOwnerTeamForm domainId={domainId} component={component}>
                        <Button variant={'surface'} width={'fit'}>
                            Assign
                        </Button>
                    </AssignOwnerTeamForm>
                )}
            </Flex>
        </Flex>
    );
};

type AssignOwnerTeamFormProps = {
    domainId: string;
    component: DetailedComponent;
} & PropsWithChildren;

export const AssignOwnerTeamForm = (props: AssignOwnerTeamFormProps) => {
    const { domainId, component } = props;

    const menu = useDisclosure();

    const { data: allTeams, isLoading: isTeamsLoading } = useQuery<Team[]>({
        queryKey: ['getAllTeams', { domainId }],
        queryFn: () => teamsApi.getAll(domainId),
    });

    const { mutateAsync: assignTeam } = useMutation<void, any, EditComponentOwnershipData>({
        mutationFn: (data) => componentsApi.updateOwnership(domainId, component.component.componentId, data),
    });

    const form = useForm<EditComponentOwnershipData>({
        values: {
            teamId: component.team?.teamId ?? '',
        },
        resolver: classValidatorResolver(EditComponentOwnershipData),
    });

    const close = () => {
        form.reset();
        menu.onClose();
    };

    const submit = async (data: EditComponentOwnershipData) => {
        await assignTeam(data);
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
                                name={'teamId'}
                                control={form.control}
                                isLoading={!allTeams || isTeamsLoading}
                                options={
                                    allTeams
                                        ? allTeams.map((team) => ({
                                              label: `${team.name}`,
                                              value: team.teamId,
                                              team,
                                          }))
                                        : []
                                }
                                label="Select team"
                                isMulti={false}
                                components={{
                                    Option: (option: any) => {
                                        const team = option.data.team as Team;

                                        return (
                                            <Flex
                                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                                p={2}
                                                onClick={() => {
                                                    option.selectOption(option);
                                                }}
                                            >
                                                <Text fontSize={14}>{team.name}</Text>
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
