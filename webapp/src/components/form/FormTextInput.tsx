import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, FormControlProps } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

export type FormTextInputProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
    debounce?: number;
    onDebounceValue?: () => void;
} & Partial<FormControlProps>;

export const FormTextInput = (props: FormTextInputProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    console.log('changed');

    return (
        <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
            {props.label && (
                <FormLabel fontSize={getFontSize(props.size)} fontWeight={400}>
                    {props.label}
                </FormLabel>
            )}

            <Input
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
                autoComplete="off"
                ref={field.ref}
                onBlur={() => {
                    field.onBlur();
                    if (props.onBlur) {
                        props.onBlur();
                    }
                }}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                disabled={field.disabled}
                variant={'filled'}
                placeholder={props.placeholder}
                size={props.size || 'sm'}
                fontSize={getFontSize(props.size)}
            />

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState?.error?.message}</FormErrorMessage>
        </FormControl>
    );
};
