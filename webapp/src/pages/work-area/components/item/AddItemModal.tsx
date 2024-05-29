import { AddItemData, DetailedWorkItem, WorkItemType } from '@domaindocs/types';
import {
    Button,
    ButtonGroup,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormTextInput } from '../../../../components/form/FormTextInput';
import { BiPlus } from 'react-icons/bi';
import { FormMenuSelect } from '../../../../components/form/FormMenuSelect';
import React from 'react';
import { ItemTypeIcon } from './ItemTypeIcon';
import { FormTextArea } from '../../../../components/form/FormTextArea';
import { workApi } from '../../../../state/api/workApi';

type AddItemModalProps = {
    domainId: string;
    areaId: string;
    isOpen: boolean;
    onClose: () => void;
    onItemAdded: (item: DetailedWorkItem) => any;
};

export const AddItemModal = (props: AddItemModalProps) => {
    const { domainId, areaId, onItemAdded, isOpen, onClose } = props;

    const form = useForm<AddItemData>({
        values: {
            name: '',
            type: WorkItemType.STORY,
            description: '',
        },
        resolver: classValidatorResolver(AddItemData),
    });

    const addItem = async (data: AddItemData) => {
        const item = await workApi().addItem(domainId, areaId, data);
        close();
        onItemAdded(item);
    };

    const close = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={close} isCentered size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create item</ModalHeader>

                <form onSubmit={form.handleSubmit(addItem)}>
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormTextInput
                                label={'Item Name'}
                                size={'sm'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Create api endpoint'}
                            />

                            <FormMenuSelect
                                label={'Type'}
                                size={'sm'}
                                name={'type'}
                                control={form.control}
                                options={[
                                    {
                                        label: 'Epic',
                                        value: WorkItemType.EPIC,
                                    },
                                    {
                                        label: 'Story',
                                        value: WorkItemType.STORY,
                                    },
                                    {
                                        label: 'Task',
                                        value: WorkItemType.TASK,
                                    },
                                    {
                                        label: 'Bug',
                                        value: WorkItemType.BUG,
                                    },
                                ]}
                                renderButton={(option) => {
                                    if (option) {
                                        return (
                                            <Button fontWeight={'normal'} size={'sm'}>
                                                <Flex gap={2}>
                                                    <ItemTypeIcon type={option.value as WorkItemType} />
                                                    <Text>{option?.label}</Text>
                                                </Flex>
                                            </Button>
                                        );
                                    }

                                    return (
                                        <Button variant={'ghost'} size={'sm'}>
                                            <Text>Choose status</Text>
                                        </Button>
                                    );
                                }}
                                renderOption={(option) => (
                                    <Flex gap={2}>
                                        <ItemTypeIcon type={option.value as WorkItemType} />
                                        <Text>{option?.label}</Text>
                                    </Flex>
                                )}
                            />

                            <FormTextArea
                                size={'sm'}
                                name={'description'}
                                control={form.control}
                                label={'Description'}
                            />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={close} size={'sm'} colorScheme={'red'}>
                                Cancel
                            </Button>

                            <Button
                                size={'sm'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                isLoading={form.formState.isSubmitting}
                                type={'submit'}
                            >
                                Create
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

type AddItemModalButtonProps = {
    domainId: string;
    areaId: string;
    onItemAdded: (item: DetailedWorkItem) => any;
};

export const AddItemModalButton = (props: AddItemModalButtonProps) => {
    const { domainId, areaId, onItemAdded } = props;

    const modal = useDisclosure();

    return (
        <>
            <Button size={'sm'} leftIcon={<BiPlus />} backgroundColor={'lightgray'} onClick={modal.onOpen}>
                Create Item
            </Button>

            <AddItemModal
                domainId={domainId}
                areaId={areaId}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                onItemAdded={onItemAdded}
            />
        </>
    );
};
