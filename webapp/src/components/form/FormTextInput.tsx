import { Input } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

export type FormTextInputProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
    debounce?: number;
    onDebounceValue?: () => void;
    leftElement?: any;
};

export const FormTextInput = (props: FormTextInputProps) => {
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
            <Input
                name={field.name}
                value={field.value}
                autoComplete="off"
                ref={field.ref}
                variant={'subtle'}
                width={'100%'}
                rounded={6}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                disabled={field.disabled}
                placeholder={props.placeholder}
            />
        </Field>
    );
};
