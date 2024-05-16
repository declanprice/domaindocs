import { Flex, Text, useToast } from '@chakra-ui/react';

import { EditableCard } from '../../../components/editable-card/EditableCard';
import { useMutation } from '@tanstack/react-query';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { UpdateProjectDescriptionData } from '@domaindocs/lib';
import { projectsApi } from '../../../state/api/projects-api';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type ProjectSummaryProps = {
    domainId: string;
    projectId: string;
    description: string;
    onDescriptionChange: (description: string) => any;
};

export const ProjectSummary = (props: ProjectSummaryProps) => {
    const { domainId, projectId, description, onDescriptionChange } = props;

    const toast = useToast();

    const { mutateAsync: updateDescription } = useMutation({
        mutationKey: ['updateProjectDescription', { domainId, projectId }],
        mutationFn: async (data: UpdateProjectDescriptionData) => {
            await projectsApi.updateDescription(domainId, projectId, data);

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
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Summary</Text>

                <EditIconButton marginLeft={'auto'} />
            </Flex>

            <Text>{description}</Text>
        </Flex>
    );
};

// export const ProjectSummary = (props: ProjectSummaryProps) => {
//   const { domainId, projectId, description, onDescriptionChange } = props;
//
//   const toast = useToast();
//
//   const { mutateAsync: updateDescription } = useMutation({
//     mutationKey: ['updateProjectDescription', { domainId, projectId }],
//     mutationFn: async (data: UpdateProjectDescriptionData) => {
//       await projectsApi.updateDescription(domainId, projectId, data);
//
//       toast({
//         position: 'top',
//         status: 'success',
//         size: 'xs',
//         colorScheme: 'gray',
//         isClosable: true,
//         duration: 3000,
//         title: 'Description updated.',
//       });
//
//       await onDescriptionChange(description);
//     },
//   });
//
//   return (
//     <EditableCard
//       header={<Text flex={1}>Summary</Text>}
//       form={{
//         values: {
//           description: description,
//         },
//         resolver: classValidatorResolver(UpdateProjectDescriptionData),
//       }}
//       onSubmit={async (data: UpdateProjectDescriptionData) => {
//         await updateDescription(data);
//       }}
//       onClose={() => {}}
//       render={
//         <>
//           <Text fontSize={14}>{description}</Text>
//         </>
//       }
//       renderForm={({ control }) => (
//         <>
//           <FormTextArea name="description" control={control} placeholder={'enter project description here'} />
//         </>
//       )}
//     />
//   );
// };
