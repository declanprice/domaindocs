import { DetailedPerson, Skill, EditPersonSkillData, CreateSkillData, PersonSkill } from '@domaindocs/types';
import { Box, Button, ButtonGroup, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { FormCreateSelect } from '../../../components/form/FormCreateSelect';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { skillsApi } from '../../../state/api/skills-api';
import { GiSkills } from 'react-icons/gi';
import {
    PopoverRoot,
    PopoverTrigger,
    PopoverContent,
    PopoverFooter,
    PopoverBody,
} from '../../../components/ui/popover';

type PersonSkillsProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonSkills = (props: PersonSkillsProps) => {
    const { domainId, person } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'blue.400'} rounded={6} p={2}>
                    <GiSkills color={'white'} />
                </Flex>

                <Text fontSize={18} ml={4}>
                    Skills
                </Text>

                <Box ml={'auto'}>
                    <EditPersonSkillForm domainId={domainId} userId={person.person.userId}>
                        <AddIconButton />
                    </EditPersonSkillForm>
                </Box>
            </Flex>

            <SimpleGrid columns={2} gap={1}>
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

    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <Flex
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                key={skill.skillId}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                rounded={6}
                px={2}
                height={'35px'}
                width="100%"
                alignItems={'center'}
            >
                <Text
                    fontSize={14}
                    fontWeight={400}
                    flex={1}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                >
                    {skill.skillName}
                </Text>

                <CloseIconButton
                    visibility={isHovering ? 'visible' : 'hidden'}
                    ml={'auto'}
                    variant={'ghost'}
                    onClick={deleteDialog.onOpen}
                />
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.open}
                header={'Remove skill?'}
                onConfirm={deletePersonSkill}
                onClose={deleteDialog.onClose}
            />
        </>
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
        form.reset();
        menu.onClose();
    };

    const submit = async (data: EditPersonSkillData) => {
        await createPersonSkill(data);
        form.reset();
        close();
    };

    if (!allSkills || isLoading) return null;

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
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <PopoverContent mr={2} backgroundColor={'white'}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <PopoverBody p={4}>
                        <Flex direction={'column'}>
                            <FormCreateSelect
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
                        </Flex>
                    </PopoverBody>

                    <PopoverFooter>
                        <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                            <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                Cancel
                            </Button>

                            <Button type={'submit'} loading={form.formState.isSubmitting}>
                                Add
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </form>
            </PopoverContent>
        </PopoverRoot>
    );
};
