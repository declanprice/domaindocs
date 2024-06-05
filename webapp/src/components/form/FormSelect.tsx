import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps } from '@chakra-ui/react';

import { Select } from 'chakra-react-select';

import { Control, useController } from 'react-hook-form';
import { SelectComponentsConfig } from 'react-select/dist/declarations/src/components';
import { getFontSize } from '../../util/getFontSize';

type FormSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    isLoading?: boolean;
    onChange?: (e: any) => void;
    onBlur?: () => void;
    isMulti?: boolean;
    components?: SelectComponentsConfig<any, any, any>;
} & Partial<FormControlProps>;

export const FormSelect = (props: FormSelectProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
            {props.label && (
                <FormLabel mb={1} fontSize={getFontSize(props.size)} fontWeight={400}>
                    {props.label}
                </FormLabel>
            )}

            <Select
                name={field.name}
                value={props.options.find((option) => option.value === field.value)}
                isDisabled={field.disabled}
                ref={field.ref}
                onChange={(e) => {
                    const value = Array.isArray(e) ? e.map((o) => o.value) : e?.value;

                    field.onChange(value);

                    if (props.onChange) {
                        props.onChange(value);
                    }
                }}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                isMulti={props.isMulti !== undefined ? props.isMulti : true}
                size={'sm'}
                isLoading={props.isLoading}
                placeholder={props.placeholder}
                options={props.options}
                components={props.components}
            />

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            {fieldState.error && (
                <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState.error.message}</FormErrorMessage>
            )}
        </FormControl>
    );
};
