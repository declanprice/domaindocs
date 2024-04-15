import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react'

import { FormTextInput } from '@components/form/FormInput.tsx'
import { useForm } from 'react-hook-form'
import { Team } from '@state/api/teams-api.ts'
import { FormSelect } from '@components/form/FormSelect.tsx'

import { CreateProjectDto } from 'lib'

export type CreateProjectDialogProps = {
    isOpen: boolean
    onClose: () => void
    teams: Team[]
    onProjectCreate: (team: CreateProjectDto) => Promise<void>
}

export const CreateProjectDialog = (props: CreateProjectDialogProps) => {
    const { isOpen, onClose, teams, onProjectCreate } = props

    const form = useForm<CreateProjectDto>({
        values: {
            name: '',
            teamId: '',
        },
        // resolver: classValidatorResolver(CreateProjectDto),
    })

    const closeAndReset = () => {
        form.reset()
        onClose()
    }

    const submit = async (data: CreateProjectDto) => {
        console.log(data)
        // console.log(new CreateProjectDto())
        // await onProjectCreate(data)
        // closeAndReset()
    }

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalHeader>Create a new project.</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Project Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of the project'}
                            />

                            <FormSelect
                                label={'Team'}
                                name={'teamId'}
                                control={form.control}
                                options={teams?.map((s) => ({
                                    label: s.name,
                                    value: s.teamId,
                                }))}
                                placeholder={'Select a team.'}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                onClick={closeAndReset}
                                size={'xs'}
                                colorScheme={'red'}
                            >
                                Cancel
                            </Button>
                            <Button
                                size={'xs'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                type={'submit'}
                                isDisabled={
                                    !form.formState.isValid ||
                                    form.formState.isSubmitting
                                }
                                isLoading={form.formState.isSubmitting}
                            >
                                Create Project
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
