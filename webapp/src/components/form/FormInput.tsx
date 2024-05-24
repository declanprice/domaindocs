import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, FormControlProps } from '@chakra-ui/react';

import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

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
        <FormControl isInvalid={fieldState.invalid} {...props}>
            {props.label && <FormLabel fontSize={getFontSize(props.size)}>{props.label}</FormLabel>}

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
                size={props.size || 'xs'}
                fontSize={getFontSize(props.size)}
            />

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState?.error?.message}</FormErrorMessage>
        </FormControl>
    );
};
