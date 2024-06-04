import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormControlProps, Checkbox } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

type FormCheckboxProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
} & Partial<FormControlProps>;

export const FormCheckbox = (props: FormCheckboxProps) => {
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

            <Checkbox
                name={field.name}
                value={field.value}
                isChecked={field.value === true}
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
                size={'md'}
                placeholder={props.placeholder}
            />

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            {fieldState.error && (
                <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState.error.message}</FormErrorMessage>
            )}
        </FormControl>
    );
};
