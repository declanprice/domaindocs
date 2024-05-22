import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps } from '@chakra-ui/react';

import { Select } from 'chakra-react-select';

import { Control, useController } from 'react-hook-form';
import { SelectComponentsConfig } from 'react-select/dist/declarations/src/components';

type FormSelectableProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
    isMulti?: boolean;
    components?: SelectComponentsConfig<any, any, any>;
} & Partial<FormControlProps>;

export const FormSelectable = (props: FormSelectableProps) => {
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
                    console.log('change', e);
                }}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                isMulti={props.isMulti !== undefined ? props.isMulti : true}
                size="sm"
                placeholder={props.placeholder}
                options={props.options}
                components={props.components}
            />

            {props.helperText && <FormHelperText fontSize={12}>{props.helperText}</FormHelperText>}

            {fieldState.error && <FormErrorMessage fontSize={12}>{fieldState.error.message}</FormErrorMessage>}
        </FormControl>
    );
};
