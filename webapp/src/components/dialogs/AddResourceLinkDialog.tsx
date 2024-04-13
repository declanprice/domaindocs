import { useForm } from 'react-hook-form'
import { object, optional, string } from 'valibot'
import { FormTextInput } from '@components/form/FormInput.tsx'
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
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useState } from 'react'
import { AddResourceLinkData } from '@state/api/subdomains-api.ts'

export type AddResourceLinkDialogProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    onAddLink: (link: AddResourceLinkData) => Promise<void>
}

export const AddResourceLinkDialog = (props: AddResourceLinkDialogProps) => {
    const { isOpen, title, onClose, onAddLink } = props

    const [isAdding, setIsAdding] = useState(false)

    const {
        control: resourceLinkControl,
        handleSubmit: submitResourceLink,
        formState: resourceLinkForm,
        reset: resetForm,
    } = useForm<AddResourceLinkData>({
        values: {
            title: '',
            subTitle: '',
            href: '',
            iconUri: '',
        },
        resolver: valibotResolver(
            object({
                title: string(),
                subTitle: string(),
                href: string(),
                iconUri: optional(string()),
            })
        ),
    })

    const closeAndReset = () => {
        resetForm()
        onClose()
    }

    const handleSubmit = async (link: AddResourceLinkData) => {
        try {
            setIsAdding(true)
            await onAddLink(link)
            closeAndReset()
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={submitResourceLink(handleSubmit)}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Title'}
                                name={'title'}
                                placeholder={'Eg: Alerts'}
                                control={resourceLinkControl}
                            />

                            <FormTextInput
                                label={'Subtitle'}
                                name={'subTitle'}
                                placeholder={'Eg: see alerts'}
                                control={resourceLinkControl}
                            />

                            <FormTextInput
                                label={'Link text'}
                                name={'href'}
                                placeholder={'Eg: https://alerts.com'}
                                control={resourceLinkControl}
                            />

                            <FormTextInput
                                label={'Icon Url'}
                                name={'iconUri'}
                                control={resourceLinkControl}
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
                                isDisabled={
                                    !resourceLinkForm.isValid || isAdding
                                }
                                isLoading={isAdding}
                                type={'submit'}
                            >
                                Add Resource Link
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
