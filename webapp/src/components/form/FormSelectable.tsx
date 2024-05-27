import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps } from '@chakra-ui/react';

import { Select } from 'chakra-react-select';

import { Control, useController } from 'react-hook-form';
import { SelectComponentsConfig } from 'react-select/dist/declarations/src/components';
import { getFontSize } from '../../util/getFontSize';

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
        <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
            {props.label && (
                <FormLabel mb={1} fontSize={getFontSize(props.size)}>
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
                size={'sm'}
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
