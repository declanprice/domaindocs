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

import { Subdomain } from '@state/api/subdomains-api.ts'
import { FormTextInput } from '@components/form/FormInput.tsx'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { minLength, object, string } from 'valibot'
import { CreateTeamData } from '@state/api/teams-api.ts'
import { FormSelect } from '@components/form/FormSelect.tsx'

export type CreateTeamDialogProps = {
    isOpen: boolean
    onClose: () => void
    subdomains: Subdomain[]
    onCreateTeam: (team: CreateTeamData) => Promise<void>
}

export const CreateTeamDialog = (props: CreateTeamDialogProps) => {
    const { isOpen, onClose, subdomains, onCreateTeam } = props

    const form = useForm<CreateTeamData>({
        values: {
            name: '',
            subdomainId: '',
        },
        resolver: valibotResolver(
            object({
                name: string(),
                subdomainId: string([
                    minLength(1, 'You must select a subdomain.'),
                ]),
            })
        ),
    })

    const closeAndReset = () => {
        form.reset()
        onClose()
    }

    const submit = async (data: CreateTeamData) => {
        await onCreateTeam(data)
        closeAndReset()
    }

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalHeader>Create a new team.</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Team Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of team'}
                            />

                            <FormSelect
                                label={'Subdomain'}
                                name={'subdomainId'}
                                control={form.control}
                                options={subdomains?.map((s) => ({
                                    label: s.name,
                                    value: s.subdomainId,
                                }))}
                                placeholder={'Select a subdomain.'}
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
                                Create Team
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
