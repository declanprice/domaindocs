import { useFieldArray, useForm } from 'react-hook-form'
import { array, minLength, object, string } from 'valibot'
import { FormTextInput } from '@components/form/FormInput.tsx'
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Flex,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { Person } from '@state/api/people-api.ts'

export type SelectPeopleDialogProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    onSearch: (name: string) => void
    isSearching: boolean
    onSelect: (people: Person[]) => Promise<void>
    people?: Person[]
}

type SearchPersonForm = {
    name: string
}

type SelectedPeopleForm = {
    people: Person[]
}

export const SelectPeopleDialog = (props: SelectPeopleDialogProps) => {
    const { isOpen, onClose, title, onSearch, isSearching, people, onSelect } =
        props

    const [isAdding, setIsAdding] = useState(false)
    const [searchName, setSearchName] = useState<string>('')
    const [searchNameDebounced] = useDebounce(searchName, 500)

    const {
        control: searchPeople,
        handleSubmit: submitSearchPeople,
        formState: searchPeopleForm,
        reset: searchPeopleReset,
    } = useForm<SearchPersonForm>({
        values: {
            name: '',
        },
        resolver: valibotResolver(
            object({
                name: string(),
            })
        ),
    })

    const {
        control: selectedPeopleControl,
        handleSubmit: submitSelectedPeople,
        formState: selectedPeopleForm,
        reset: selectedPeopleReset,
    } = useForm<SelectedPeopleForm>({
        values: {
            people: [],
        },
        resolver: valibotResolver(
            object({
                people: array(
                    object({
                        personId: string(),
                    }),
                    [minLength(1, 'Select at least 1 person')]
                ),
            })
        ),
    })

    const {
        append,
        remove,
        fields: selectedPeople,
    } = useFieldArray({
        control: selectedPeopleControl,
        name: 'people',
    })

    useEffect(() => {
        if (!searchPeopleForm.touchedFields.name) return
        onSearch(searchNameDebounced)
    }, [searchNameDebounced])

    const closeAndReset = () => {
        searchPeopleReset()
        selectedPeopleReset()
        onClose()
    }

    const handleClick = (person: Person) => {
        const indexOf = selectedPeople.findIndex(
            (p) => p.userId === person.userId
        )

        if (indexOf !== -1) {
            remove(indexOf)
        } else {
            append(person)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Box maxWidth={200}>
                        <FormTextInput
                            name={'name'}
                            control={searchPeople}
                            placeholder={'type persons name here.'}
                            onChange={() => {
                                submitSearchPeople((form: SearchPersonForm) => {
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
                                {people && (
                                    <List my={2}>
                                        {people.map((p) => (
                                            <ListItem
                                                key={p.userId}
                                                display={'flex'}
                                                alignItems={'center'}
                                                _hover={{
                                                    backgroundColor: 'gray.50',
                                                }}
                                                px={2}
                                                onClick={() => {
                                                    handleClick(p)
                                                }}
                                            >
                                                <Flex
                                                    alignItems="center"
                                                    width={'100%'}
                                                    mb={2}
                                                >
                                                    <Avatar
                                                        size={'xs'}
                                                        src={p.iconUri}
                                                        name={`${p.firstName} ${p.lastName}`}
                                                    />

                                                    <Box ml="3">
                                                        <Text
                                                            fontWeight="regular"
                                                            fontSize={14}
                                                        >
                                                            {p.firstName}{' '}
                                                            {p.lastName}
                                                        </Text>

                                                        {p.roleName && (
                                                            <Text fontSize={12}>
                                                                {p.roleName}
                                                            </Text>
                                                        )}
                                                    </Box>
                                                </Flex>

                                                <Checkbox
                                                    isChecked={selectedPeople.some(
                                                        (sp) =>
                                                            sp.userId ===
                                                            p.userId
                                                    )}
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
                            isDisabled={!selectedPeopleForm.isValid || isAdding}
                            isLoading={isAdding}
                            onClick={() => {
                                submitSelectedPeople(
                                    async (form: SelectedPeopleForm) => {
                                        try {
                                            setIsAdding(true)
                                            await onSelect(form.people)
                                            closeAndReset()
                                        } finally {
                                            setIsAdding(false)
                                        }
                                    }
                                )()
                            }}
                        >
                            Select Contacts
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
