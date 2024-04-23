import { Text, useToast, Wrap, WrapItem } from '@chakra-ui/react';

import { EditableCard } from '../../../components/editable-card/EditableCard';
import { useMutation } from '@tanstack/react-query';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { queryClient } from '../../../state/query-client';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { UpdateSubdomainDescriptionDto } from '@domaindocs/lib';

type SubdomainSummaryProps = {
    domainId: string;
    subdomainId: string;
    peopleCount?: number;
    teamCount?: number;
    projectCount?: number;
    description: string;
    onDescriptionChange: (description: string) => any;
};

export const SubdomainSummary = (props: SubdomainSummaryProps) => {
    const { domainId, subdomainId, peopleCount, projectCount, teamCount, description, onDescriptionChange } = props;

    const toast = useToast();

    const { mutateAsync: updateDescription } = useMutation({
        mutationKey: ['updateDescription'],
        mutationFn: async (data: UpdateSubdomainDescriptionDto) => {
            await subdomainsApi.updateDescription(domainId, subdomainId, data);

            toast({
                position: 'top',
                status: 'success',
                size: 'xs',
                colorScheme: 'gray',
                isClosable: true,
                duration: 3000,
                title: 'Description updated.',
            });

            await onDescriptionChange(description);
        },
    });

    return (
        <EditableCard
            header={<Text flex={1}>Summary</Text>}
            form={{
                values: {
                    description: description,
                },
                resolver: classValidatorResolver(UpdateSubdomainDescriptionDto),
            }}
            onSubmit={async (data: UpdateSubdomainDescriptionDto) => {
                await updateDescription(data);
            }}
            onClose={() => {}}
            render={
                <>
                    <Wrap mb={2}>
                        <WrapItem>
                            <Text fontSize={14}> {peopleCount} People</Text>
                        </WrapItem>
                        <WrapItem>
                            <Text fontSize={14}>{teamCount} Teams</Text>
                        </WrapItem>
                        <WrapItem>
                            <Text fontSize={14}>{projectCount} Projects</Text>
                        </WrapItem>
                    </Wrap>

                    <Text fontSize={14}>{description}</Text>
                </>
            }
            renderForm={({ control }) => (
                <>
                    <FormTextArea name="description" control={control} placeholder={'enter description here'} />
                </>
            )}
        />
    );
};
