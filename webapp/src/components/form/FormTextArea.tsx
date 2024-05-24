import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Textarea, FormControlProps } from '@chakra-ui/react';

import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

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
        <FormControl isInvalid={fieldState.invalid} {...props}>
            {props.label && <FormLabel fontSize={getFontSize(props.size)}>{props.label}</FormLabel>}

            <Textarea
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
                disabled={field.disabled}
                fontSize={getFontSize(props.size)}
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
                size={props.size}
            />

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            {fieldState.error && (
                <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState.error.message}</FormErrorMessage>
            )}
        </FormControl>
    );
};
