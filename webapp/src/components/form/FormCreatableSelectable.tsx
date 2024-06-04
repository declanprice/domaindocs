import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps, Text } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

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
    isMulti?: boolean;
} & Partial<FormControlProps>;

export const FormCreatableSelectable = (props: FormCreatableSelectProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
            {props.label && (
                <FormLabel fontSize={getFontSize(props.size)} mb={1} fontWeight={400}>
                    {props.label}
                </FormLabel>
            )}

            <CreatableSelect
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
                onCreateOption={props.onCreateOption}
                isMulti={props.isMulti !== undefined ? props.isMulti : true}
                size="sm"
                placeholder={props.placeholder}
                options={props.options}
            />

            {props.helperText && <FormHelperText fontSize={12}>{props.helperText}</FormHelperText>}
            {fieldState.error && <FormErrorMessage fontSize={12}>{fieldState.error.message}</FormErrorMessage>}
        </FormControl>
    );
};
