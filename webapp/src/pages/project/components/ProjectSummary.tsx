import { Flex, Text } from '@chakra-ui/react';

import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { useEditable } from '../../../hooks/useEditable';
import { ProjectSummaryEdit } from './ProjectSummaryEdit';
import React from 'react';

type ProjectSummaryProps = {
    domainId: string;
    projectId: string;
    description: string;
    onEdit: () => void;
};

export const ProjectSummary = (props: ProjectSummaryProps) => {
    const { domainId, projectId, description, onEdit } = props;

    const editSummary = useEditable();

    return (
        <>
            {editSummary.isEditing ? (
                <ProjectSummaryEdit
                    domainId={domainId}
                    projectId={projectId}
                    description={description}
                    onCancel={editSummary.onClose}
                    onSubmit={() => {
                        editSummary.onClose();
                        onEdit();
                    }}
                />
            ) : (
                <Flex direction={'column'} gap={1}>
                    <Flex>
                        <Text fontSize={16}>Summary</Text>

                        <EditIconButton marginLeft={'auto'} onClick={editSummary.onEdit} />
                    </Flex>

                    <Text>{description}</Text>
                </Flex>
            )}
        </>
    );
};
