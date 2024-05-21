import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, FormControlProps } from '@chakra-ui/react';

import { Control, useController } from 'react-hook-form';

type FormTextInputProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
} & Partial<FormControlProps>;

export const FormTextInput = (props: FormTextInputProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <FormControl
            isInvalid={fieldState.invalid}
            onBlur={props.onBlur}
            onChange={props.onChange}
            label={props.label}
            placeholder={props.placeholder}
        >
            {props.label && (
                <FormLabel fontSize={12} mb={1}>
                    {props.label}
                </FormLabel>
            )}

            <Input
                autoComplete="off"
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
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
                variant={'filled'}
                placeholder={props.placeholder}
                size={'xs'}
            />

            {props.helperText && <FormHelperText fontSize={12}>{props.helperText}</FormHelperText>}

            {fieldState.error && <FormErrorMessage fontSize={12}>{fieldState.error.message}</FormErrorMessage>}
        </FormControl>
    );
};
