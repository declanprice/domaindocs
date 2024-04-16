import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { CreateProjectDto, TeamDto } from '@domaindocs/lib';
import { FormTextInput } from '../form/FormInput';
import { FormSelect } from '../form/FormSelect';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export type CreateProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  teams: TeamDto[];
  onProjectCreate: (team: CreateProjectDto) => Promise<void>;
};

export const CreateProjectDialog = (props: CreateProjectDialogProps) => {
  const { isOpen, onClose, teams, onProjectCreate } = props;

  const form = useForm<CreateProjectDto>({
    values: {
      name: '',
      teamId: '',
    },
    resolver: classValidatorResolver(CreateProjectDto),
  });

  const closeAndReset = () => {
    form.reset();
    onClose();
  };

  const submit = async (data: CreateProjectDto) => {
    await onProjectCreate(data);
    closeAndReset();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalHeader>Create a new project.</ModalHeader>
          <ModalBody>
            <Stack gap={4}>
              <FormTextInput
                label={'Project Name'}
                name={'name'}
                control={form.control}
                placeholder={'Name of the project'}
              />

              <FormSelect
                label={'Team'}
                name={'teamId'}
                control={form.control}
                options={teams?.map((s) => ({
                  label: s.name,
                  value: s.teamId,
                }))}
                placeholder={'Select a team.'}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={closeAndReset}
                size={'xs'}
                colorScheme={'red'}
                isDisabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                size={'xs'}
                colorScheme={'gray'}
                variant={'solid'}
                type={'submit'}
                isLoading={form.formState.isSubmitting}
              >
                Create Project
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
