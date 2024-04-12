import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { string } from 'valibot'

export type AddContactDialogProps = {
    isOpen: boolean
    title: string
    onClose: () => void
}

export const AddContactDialog = (props: AddContactDialogProps) => {
    const { isOpen, onClose, title } = props

    const { control: searchControl, handleSubmit: search } = useForm({
        values: {
            name: '',
        },
        resolver: joiResolver({
            name: string(),
        }),
    })

    const { control: contactsControl, handleSubmit: addContacts } = useForm({
        values: {
            name: '',
        },
        resolver: joiResolver({
            name: string(),
        }),
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <form></form>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button
                            onClick={onClose}
                            size={'sm'}
                            colorScheme={'red'}
                        >
                            Cancel
                        </Button>
                        <Button
                            size={'sm'}
                            colorScheme={'gray'}
                            variant={'solid'}
                        >
                            Add Contact
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
