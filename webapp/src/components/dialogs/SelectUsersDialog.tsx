import { useForm } from 'react-hook-form'
import { object, string } from 'valibot'
import { FormTextInput } from '@components/form/FormInput.tsx'
import { UserListItem } from '@components/user/UserListItem.tsx'
import {
    Box,
    Button,
    ButtonGroup,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { User } from '@state/api/user-api.ts'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'

export type SelectUsersDialogProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    onSearch: (name: string) => void
    isSearching: boolean
    onSelect: (users: User[]) => void
    users?: User[]
}

type SearchUserForm = {
    name: string
}

export const SelectUsersDialog = (props: SelectUsersDialogProps) => {
    const { isOpen, onClose, title, onSearch, isSearching, users } = props

    const {
        control: searchControl,
        handleSubmit: handleSearch,
        formState,
    } = useForm<SearchUserForm>({
        values: {
            name: '',
        },
        resolver: valibotResolver(
            object({
                name: string(),
            })
        ),
    })

    const [searchName, setSearchName] = useState<string>('')

    const [searchNameDebounced] = useDebounce(searchName, 500)

    useEffect(() => {
        if (!formState.isDirty) return
        onSearch(searchNameDebounced)
    }, [searchNameDebounced])

    // const { control: contactsControl, handleSubmit: addContacts } = useForm({
    //     values: {
    //         name: '',
    //     },
    //     resolver: joiResolver({
    //         name: string(),
    //     }),
    // })

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Box maxWidth={200}>
                        <FormTextInput
                            name={'name'}
                            control={searchControl}
                            placeholder={'type persons name here.'}
                            onChange={() => {
                                handleSearch((form: SearchUserForm) => {
                                    setSearchName(form.name)
                                })()
                            }}
                        />
                    </Box>

                    <Box my={2}>
                        {isSearching ? (
                            <LoadingContainer />
                        ) : (
                            <>
                                {users && (
                                    <List>
                                        {users.map((u) => (
                                            <ListItem>
                                                <UserListItem
                                                    firstName={u.firstName}
                                                    lastName={u.lastName}
                                                    roleName={u.roleName}
                                                    iconUri={u.iconUri}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </>
                        )}
                    </Box>
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
