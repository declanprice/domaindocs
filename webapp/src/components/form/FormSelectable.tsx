import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps } from '@chakra-ui/react';

import { Select } from 'chakra-react-select';

import { Control, useController } from 'react-hook-form';

type FormSelectableProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
} & Partial<FormControlProps>;

export const FormSelectable = (props: FormSelectableProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <FormControl isInvalid={fieldState.invalid} {...props}>
            {props.label && (
                <FormLabel fontSize={12} mb={1}>
                    {props.label}
                </FormLabel>
            )}

            <Select
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
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
                isMulti
                size="sm"
                variant={'filled'}
                placeholder={props.placeholder}
                colorScheme={'orange'}
                options={props.options}
            />

            {props.helperText && <FormHelperText fontSize={12}>{props.helperText}</FormHelperText>}

            {fieldState.error && <FormErrorMessage fontSize={12}>{fieldState.error.message}</FormErrorMessage>}
        </FormControl>
    );
};
