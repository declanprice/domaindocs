import {
    Avatar,
    Button,
    ButtonGroup,
    Flex,
    Link,
    List,
    ListItem,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Portal,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { AddTeamMemberData, DetailedPerson, Person, TeamMember } from '@domaindocs/types';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { teamsApi } from '../../../state/api/teams-api';
import { peopleApi } from '../../../state/api/people-api';
import { FormSelect } from '../../../components/form/FormSelect';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { GoPeople } from 'react-icons/go';

type TeamMembersProps = {
    domainId: string;
    teamId: string;
    members: TeamMember[];
};

export const TeamMembers = (props: TeamMembersProps) => {
    const { domainId, teamId, members } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'teal.300'} rounded={6} p={2}>
                    <GoPeople color={'white'} />
                </Flex>

                <Text ml={4}>Members</Text>

                <TeamMemberForm domainId={domainId} teamId={teamId} containerRef={ref}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </TeamMemberForm>
            </Flex>

            <List>
                {members.map((member) => (
                    <TeamMemberListItem domainId={domainId} teamId={teamId} member={member} />
                ))}
            </List>
        </Flex>
    );
};

type TeamMemberListItemProps = {
    domainId: string;
    teamId: string;
    member: TeamMember;
};

export const TeamMemberListItem = (props: TeamMemberListItemProps) => {
    const { domainId, teamId, member } = props;

    const deleteDialog = useDisclosure();

    const ref = useRef(null);

    const { mutateAsync: removeMember } = useMutation({
        mutationFn: async () => {
            return teamsApi.removeMember(domainId, teamId, member.userId);
        },
    });

    return (
        <ListItem
            ref={ref}
            key={member.userId}
            p={1}
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            rounded={6}
            data-group
        >
            <Flex alignItems={'center'}>
                <Flex gap={2} alignItems={'center'} height={'30px'}>
                    <Avatar name={`${member.firstName} ${member.lastName}`} size={'xs'} src={member.iconUri} />

                    <Link fontSize={12} href={`/${domainId}/people/${member.userId}`} target={'_blank'}>
                        {member.firstName} {member.lastName}
                    </Link>
                </Flex>

                <ButtonGroup display={'none'} _groupHover={{ display: 'flex' }} spacing={1} ml={'auto'}>
                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove member?'}
                onConfirm={removeMember}
                onCancel={deleteDialog.onClose}
            />
        </ListItem>
    );
};

type TeamMemberFormProps = {
    domainId: string;
    teamId: string;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const TeamMemberForm = (props: TeamMemberFormProps) => {
    const { domainId, teamId, containerRef } = props;

    const menu = useDisclosure();

    const { data: allPeople, isLoading: isPeopleLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.search(domainId, {}),
        initialData: [],
    });

    const { mutateAsync: addMember } = useMutation<void, any, AddTeamMemberData>({
        mutationFn: (data) => teamsApi.addMember(domainId, teamId, data),
    });

    const form = useForm<AddTeamMemberData>({
        values: {
            userId: '',
        },
        resolver: classValidatorResolver(AddTeamMemberData),
    });

    const close = () => {
        form.reset();
        menu.onClose();
    };

    const submit = async (data: AddTeamMemberData) => {
        await addMember(data);
        close();
    };

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'lightgray'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack spacing={4}>
                                <FormSelect
                                    name={'userId'}
                                    control={form.control}
                                    isLoading={isPeopleLoading}
                                    options={allPeople.map(({ person }) => ({
                                        label: `${person.firstName} ${person.lastName}`,
                                        value: person.userId,
                                        person,
                                    }))}
                                    label="Select user"
                                    isMulti={false}
                                    components={{
                                        Option: (option) => {
                                            const person = option.data.person as Person;

                                            return (
                                                <Flex
                                                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                                                    p={1}
                                                    onClick={() => {
                                                        option.selectOption(option);
                                                    }}
                                                >
                                                    <PersonAvatar {...person} small />
                                                </Flex>
                                            );
                                        },
                                    }}
                                />
                            </Stack>
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button
                                    size={'sm'}
                                    variant={'red'}
                                    onClick={close}
                                    isDisabled={form.formState.isSubmitting}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    size={'sm'}
                                    colorScheme={'blue'}
                                    type={'submit'}
                                    isLoading={form.formState.isSubmitting}
                                >
                                    Add Member
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};
