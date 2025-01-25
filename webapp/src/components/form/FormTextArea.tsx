import { Textarea } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

type FormTextAreaProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
};

export const FormTextArea = (props: FormTextAreaProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <Field
            disabled={field.disabled}
            label={props.label}
            helperText={props.helperText}
            errorText={fieldState?.error?.message}
            invalid={fieldState.invalid}
        >
            <Textarea
                name={field.name}
                value={field.value}
                disabled={field.disabled}
                ref={field.ref}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                variant={'subtle'}
                placeholder={props.placeholder}
            />
        </Field>
    );
};
