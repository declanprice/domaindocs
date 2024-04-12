import {
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'

import { EditIconButton } from '@components/buttons/EditIconButton.tsx'
import { CloseIconButton } from '@components/buttons/CloseIconButton.tsx'
import { FormTextArea } from '@components/form/FormTextArea.tsx'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { maxLength, minLength, object, string } from 'valibot'
import { CheckIconButton } from '@components/buttons/CheckIconButton.tsx'
import { useEditable } from '@hooks/useEditable.ts'

type SummaryCardProps = {
    peopleCount?: number
    teamCount?: number
    projectCount?: number
    description: string
    onDescriptionChange: (description: string) => any
}

export const SummaryCard = (props: SummaryCardProps) => {
    const {
        peopleCount,
        projectCount,
        teamCount,
        description,
        onDescriptionChange,
    } = props

    const { handleSubmit, control, reset } = useForm({
        values: {
            description: description,
        },
        resolver: valibotResolver(
            object({
                description: string([
                    minLength(2, 'Minimum length of 2'),
                    minLength(3, 'Minimum length of 3'),
                    maxLength(500, 'Maximum length of 500'),
                ]),
            })
        ),
    })

    const { isEditing, onClose, onEdit, onSubmit, isSubmitting } = useEditable()

    return (
        <Card boxShadow="xs">
            <form
                onSubmit={handleSubmit(async ({ description }) => {
                    await onSubmit(() => onDescriptionChange(description))
                })}
            >
                <CardHeader pb={0} fontSize={16}>
                    <Flex>
                        <Text flex={1}>Summary</Text>

                        {isEditing ? (
                            <ButtonGroup>
                                <CheckIconButton
                                    type={'submit'}
                                    isLoading={isSubmitting}
                                />
                                <CloseIconButton
                                    isDisabled={isSubmitting}
                                    onClick={() => {
                                        reset()
                                        onClose()
                                    }}
                                />
                            </ButtonGroup>
                        ) : (
                            <EditIconButton onClick={onEdit} />
                        )}
                    </Flex>
                </CardHeader>

                <CardBody pt={1}>
                    <Wrap mb={2}>
                        {peopleCount !== undefined && (
                            <WrapItem fontSize={14}>
                                {peopleCount} People
                            </WrapItem>
                        )}
                        {teamCount !== undefined && (
                            <WrapItem fontSize={14}>{teamCount} Teams</WrapItem>
                        )}
                        {projectCount !== undefined && (
                            <WrapItem fontSize={14}>
                                {projectCount} Projects
                            </WrapItem>
                        )}
                    </Wrap>

                    {isEditing ? (
                        <FormTextArea
                            name="description"
                            control={control}
                            placeholder={'enter description here'}
                        />
                    ) : (
                        <Text fontSize={14}>{description}</Text>
                    )}
                </CardBody>
            </form>
        </Card>
    )
}
