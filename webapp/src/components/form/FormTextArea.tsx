import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
} from '@chakra-ui/react'

import { Control, useController } from 'react-hook-form'

type FormTextAreaProps = {
    name: string
    placeholder?: string
    control: Control<any>
    label?: string
    helperText?: string
}

export const FormTextArea = (props: FormTextAreaProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    })

    return (
        <FormControl isInvalid={fieldState.invalid}>
            {props.label && <FormLabel>{props.label}</FormLabel>}

            <Textarea
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
                disabled={field.disabled}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
                variant={'filled'}
                placeholder={props.placeholder}
                size={'xs'}
            />

            {props.helperText && (
                <FormHelperText fontSize={12}>
                    {props.helperText}
                </FormHelperText>
            )}

            {fieldState.error && (
                <FormErrorMessage fontSize={12}>
                    {fieldState.error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
