import { Text, useToast, Wrap, WrapItem } from '@chakra-ui/react';

import { EditableCard } from '../../../components/cards/editable-card/EditableCard';
import { useMutation } from '@tanstack/react-query';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ProjectTechnology, UpdateProjectDescription } from '@domaindocs/lib';
import { projectsApi } from '../../../state/api/projects-api';

type ProjectSummaryProps = {
  domainId: string;
  projectId: string;
  technologies: ProjectTechnology[];
  description: string;
  onDescriptionChange: (description: string) => any;
};

export const ProjectSummary = (props: ProjectSummaryProps) => {
  const {
    domainId,
    projectId,
    technologies,
    description,
    onDescriptionChange,
  } = props;

  const toast = useToast();

  const { mutateAsync: updateDescription } = useMutation({
    mutationKey: ['updateProjectDescription', { domainId, projectId }],
    mutationFn: async (data: UpdateProjectDescription) => {
      await projectsApi.updateProjectDescription(domainId, projectId, data);

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
        resolver: classValidatorResolver(UpdateProjectDescription),
      }}
      onSubmit={async (data: UpdateProjectDescription) => {
        await updateDescription(data);
      }}
      onClose={() => {}}
      render={
        <>
          {technologies.length && (
            <Wrap mb={2}>
              {technologies.map((technology) => (
                <WrapItem>
                  <Text fontSize={14}> {technology.name}</Text>
                </WrapItem>
              ))}
            </Wrap>
          )}

          <Text fontSize={14}>{description}</Text>
        </>
      }
      renderForm={({ control }) => (
        <>
          <FormTextArea
            name="description"
            control={control}
            placeholder={'enter project description here'}
          />
        </>
      )}
    />
  );
};
