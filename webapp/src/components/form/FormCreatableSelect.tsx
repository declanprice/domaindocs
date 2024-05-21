import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps } from '@chakra-ui/react';

import { CreatableSelect } from 'chakra-react-select';

import { Control, useController } from 'react-hook-form';

type FormCreatableSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
    onCreateOption?: (value: string) => void;
} & Partial<FormControlProps>;

export const FormCreatableSelect = (props: FormCreatableSelectProps) => {
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

            <CreatableSelect
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
                ref={field.ref}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                    console.log('change', e);
                }}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                onCreateOption={props.onCreateOption}
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
