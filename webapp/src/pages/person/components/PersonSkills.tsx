import {
    EditPersonRoleData,
    CreateRoleData,
    DetailedPerson,
    PersonRole,
    Role,
    Skill,
    EditPersonSkillData,
    CreateSkillData,
    PersonSkill,
} from '@domaindocs/types';
import {
    Button,
    ButtonGroup,
    Flex,
    List,
    ListItem,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Show,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
    VisuallyHidden,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { GrWorkshop } from 'react-icons/gr';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { useHover } from '@uidotdev/usehooks';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from '../../../components/form/FormCheckbox';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { rolesApi } from '../../../state/api/roles-api';
import { FormCreatableSelectable } from '../../../components/form/FormCreatableSelectable';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { skillsApi } from '../../../state/api/skills-api';
import { GiSkills } from 'react-icons/gi';
import { PersonRoleForm } from './PersonRoles';

type PersonSkillsProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonSkills = (props: PersonSkillsProps) => {
    const { domainId, person } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'blue.400'} rounded={6} p={2}>
                    <GiSkills color={'white'} />
                </Flex>

                <Text ml={4}>Skills</Text>

                <EditPersonSkillForm domainId={domainId} userId={person.person.userId}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </EditPersonSkillForm>
            </Flex>

            <SimpleGrid columns={2} spacing={1}>
                {person.skills.map((skill) => (
                    <PersonSkillItem domainId={domainId} userId={person.person.userId} skill={skill} />
                ))}
            </SimpleGrid>
        </Flex>
    );
};

type PersonSkillItemProps = {
    domainId: string;
    userId: string;
    skill: PersonSkill;
};

export const PersonSkillItem = (props: PersonSkillItemProps) => {
    const { domainId, userId, skill } = props;

    const deleteDialog = useDisclosure();

    const { mutateAsync: deletePersonSkill } = useMutation({
        mutationKey: ['deletePersonSkill', { domainId, userId, skillId: skill.skillId }],
        mutationFn: async () => {
            return peopleApi.deleteSkill(domainId, userId, skill.skillId);
        },
    });

    const [ref, isHovering] = useHover();

    return (
        <WrapItem ref={ref} key={skill.skillId} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} rounded={6}>
            <Flex px={2} height={'35px'} width="100%" alignItems={'center'}>
                <Text
                    fontSize={12}
                    fontWeight={400}
                    flex={1}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                >
                    {skill.skillName}
                </Text>

                <CloseIconButton hidden={!isHovering} ml={'auto'} size={'xs'} onClick={deleteDialog.onOpen} />
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove skill?'}
                onConfirm={deletePersonSkill}
                onCancel={deleteDialog.onClose}
            />
        </WrapItem>
    );
};

type EditPersonSkillFormProps = {
    domainId: string;
    userId: string;
} & PropsWithChildren;

export const EditPersonSkillForm = (props: EditPersonSkillFormProps) => {
    const { domainId, userId } = props;

    const menu = useDisclosure();

    const { data: allSkills, isLoading } = useQuery<Skill[]>({
        queryKey: ['searchSkills', { domainId }],
        queryFn: () => skillsApi.search(domainId, {}),
    });

    const { mutateAsync: createSkill } = useMutation<Skill, DefaultError, CreateSkillData>({
        mutationKey: ['createSkill', { domainId }],
        mutationFn: async (data) => {
            return skillsApi.create(domainId, data);
        },
    });

    const { mutateAsync: createPersonSkill } = useMutation<void, DefaultError, EditPersonSkillData>({
        mutationKey: ['createPersonSkill', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.createSkill(domainId, userId, data);
        },
    });

    const form = useForm<EditPersonSkillData>({
        values: {
            skillId: '',
        },
        resolver: classValidatorResolver(EditPersonSkillData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditPersonSkillData) => {
        await createPersonSkill(data);
        close();
    };

    if (!allSkills || isLoading) return null;

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <form onSubmit={form.handleSubmit(submit)}>
                <PopoverContent mr={2} backgroundColor={'lightgray'}>
                    <PopoverBody p={4}>
                        <Stack spacing={4}>
                            <FormCreatableSelectable
                                label={'Skill'}
                                name={'skillId'}
                                control={form.control}
                                options={allSkills.map((s) => ({
                                    label: s.name,
                                    value: s.skillId,
                                }))}
                                isMulti={false}
                                onCreateOption={async (name) => {
                                    const skill = await createSkill({
                                        name,
                                    });

                                    form.setValue('skillId', skill.skillId);

                                    queryClient.setQueryData(['searchSkills', { domainId }], [...allSkills, skill]);
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
                                Add
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </form>
        </Popover>
    );
};
