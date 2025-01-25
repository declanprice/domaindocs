import { DetailedWorkItem } from '@domaindocs/types';
import { useEditable } from '../../../../../hooks/useEditable';
import { FormTextArea } from '../../../../../components/form/FormTextArea';
import { Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UpdateItemDescriptionData } from '../../../../../../../shared/types/src/work-area/update-item-description-data';
import { workApi } from '../../../../../state/api/workApi';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { EditIconButton } from '../../../../../components/buttons/EditIconButton';
import React from 'react';
import { CloseIconButton } from '../../../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../../../components/buttons/CheckIconButton';

type ItemDescriptionProps = {
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemDescription = (props: ItemDescriptionProps) => {
    const { domainId, areaId, item } = props;

    const editing = useEditable();

    const form = useForm({
        values: {
            description: item.description,
        },
        resolver: classValidatorResolver(UpdateItemDescriptionData),
    });

    const update = useMutation<void, any, UpdateItemDescriptionData>({
        mutationKey: ['updateItemDescription', { itemId: item.id }],
        mutationFn: (data) => workApi().updateItemDescription(domainId, areaId, item.id, data),
    });

    if (editing.isEditing) {
        return (
            <Flex direction={'column'} gap={2} py={2}>
                <Flex>
                    <Text fontSize={16}>Description</Text>

                    <CloseIconButton
                        marginLeft={'auto'}
                        onClick={() => {
                            form.reset();
                            editing.onClose();
                        }}
                    />
                    <CheckIconButton
                        loading={form.formState.isSubmitting}
                        onClick={() => {
                            form.handleSubmit(async (data) => {
                                await update.mutateAsync(data);
                                editing.onClose();
                            })();
                        }}
                    />
                </Flex>

                <FormTextArea name={'description'} control={form.control} />
            </Flex>
        );
    }

    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Flex>
                <Text fontSize={16}>Description</Text>

                <EditIconButton marginLeft={'auto'} onClick={editing.onEdit} />
            </Flex>

            <Flex
                flex={1}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                rounded={4}
                p={1}
                onClick={editing.onEdit}
            >
                <Text fontSize={12}>{item.description}</Text>
            </Flex>
        </Flex>
    );
};
