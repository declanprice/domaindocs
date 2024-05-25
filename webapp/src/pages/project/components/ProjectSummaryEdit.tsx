import { Flex, Text } from '@chakra-ui/react';
import { UpdateProjectDescriptionData } from '@domaindocs/types';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { projectsApi } from '../../../state/api/projects-api';

type ProjectSummaryEditProps = {
    domainId: string;
    projectId: string;
    description: string;
    onSubmit: () => void;
    onCancel: () => void;
};

export const ProjectSummaryEdit = (props: ProjectSummaryEditProps) => {
    const { domainId, projectId, description, onCancel, onSubmit } = props;

    const { mutateAsync } = useMutation<void, DefaultError, UpdateProjectDescriptionData>({
        mutationKey: ['updateProjectSummary', { domainId, projectId }],
        mutationFn: (data) => projectsApi.updateDescription(domainId, projectId, data),
    });

    const { control, getValues } = useForm({
        values: {
            description: description,
        },
        resolver: classValidatorResolver(UpdateProjectDescriptionData),
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Summary</Text>

                <CloseIconButton marginLeft={'auto'} onClick={onCancel} />

                <CheckIconButton
                    onClick={async () => {
                        await mutateAsync({
                            description: getValues('description'),
                        });

                        onSubmit();
                    }}
                />
            </Flex>

            <FormTextArea name={'description'} control={control} />
        </Flex>
    );
};
