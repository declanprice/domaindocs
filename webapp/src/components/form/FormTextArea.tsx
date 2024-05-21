import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Textarea, FormControlProps } from '@chakra-ui/react';

import { Control, useController } from 'react-hook-form';

type FormTextAreaProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
} & Partial<FormControlProps>;

export const FormTextArea = (props: FormTextAreaProps) => {
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
            {props.label && <FormLabel>{props.label}</FormLabel>}

            <Textarea
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
