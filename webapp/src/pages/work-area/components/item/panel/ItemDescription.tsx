import { DetailedWorkItem } from '@domaindocs/types';
import { useEditable } from '../../../../../hooks/useEditable';
import { FormTextArea } from '../../../../../components/form/FormTextArea';
import { Button, ButtonGroup, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UpdateItemDescriptionData } from '../../../../../../../shared/types/src/work-area/update-item-description-data';
import { workApi } from '../../../../../state/api/workApi';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

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
            <Stack spacing={2}>
                <FormTextArea name={'description'} control={form.control} />

                <ButtonGroup ml={'auto'}>
                    <Button
                        size={'sm'}
                        colorScheme={'red'}
                        onClick={() => {
                            form.reset();
                            editing.onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        size={'sm'}
                        isLoading={form.formState.isSubmitting}
                        onClick={() => {
                            form.handleSubmit(async (data) => {
                                await update.mutateAsync(data);
                                editing.onClose();
                            })();
                        }}
                    >
                        Save
                    </Button>
                </ButtonGroup>
            </Stack>
        );
    }

    return (
        <Flex
            flex={1}
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            rounded={4}
            p={1}
            onClick={editing.onEdit}
        >
            <Text fontSize={12}>{item.description}</Text>
        </Flex>
    );
};
