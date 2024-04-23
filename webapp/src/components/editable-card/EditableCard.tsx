import { ButtonGroup, Card, CardBody, CardHeader, Flex } from '@chakra-ui/react';

import { CheckIconButton } from '../buttons/CheckIconButton';
import { CloseIconButton } from '../buttons/CloseIconButton';
import { EditIconButton } from '../buttons/EditIconButton';
import { Control, Resolver, useForm } from 'react-hook-form';
import { useState } from 'react';

type EditableCardProps = {
    header: any;
    form: {
        values: any;
        resolver?: Resolver;
    };
    onSubmit: (data: any) => Promise<void>;
    onClose?: () => void;
    renderForm: (form: { control: Control }) => any;
    render: any;
};

export const EditableCard = (props: EditableCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        values: props.form.values,
        resolver: props.form.resolver,
    });

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                <Flex>
                    {props.header}

                    {isEditing ? (
                        <ButtonGroup>
                            <CheckIconButton
                                onClick={() => {
                                    form.handleSubmit(async (data) => {
                                        await props.onSubmit(data);
                                        setIsEditing(false);
                                        form.reset();
                                        if (props.onClose) {
                                            props.onClose();
                                        }
                                    })();
                                }}
                                isLoading={form.formState.isSubmitting}
                            />
                            <CloseIconButton
                                isDisabled={form.formState.isSubmitting}
                                onClick={() => {
                                    form.reset();
                                    setIsEditing(false);
                                    if (props.onClose) {
                                        props.onClose();
                                    }
                                }}
                            />
                        </ButtonGroup>
                    ) : (
                        <EditIconButton
                            onClick={() => {
                                setIsEditing(true);
                            }}
                        />
                    )}
                </Flex>
            </CardHeader>

            <CardBody pt={1}>
                {isEditing ? <form>{props.renderForm({ control: form.control })}</form> : <>{props.render}</>}
            </CardBody>
        </Card>
    );
};
