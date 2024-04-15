import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormControlProps,
    Select,
} from '@chakra-ui/react'

import { Control, useController } from 'react-hook-form'

type FormSelectProps = {
    name: string
    placeholder?: string
    control: Control<any>
    label?: string
    helperText?: string
    options: { value: string; label: string }[]
    onChange?: (e: any) => void
    onBlur?: () => void
} & Partial<FormControlProps>

export const FormSelect = (props: FormSelectProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    })

    return (
        <FormControl isInvalid={fieldState.invalid} {...props}>
            {props.label && (
                <FormLabel fontSize={12} mb={1}>
                    {props.label}
                </FormLabel>
            )}

            <Select
                autoComplete="off"
                name={field.name}
                value={field.value}
                isDisabled={field.disabled}
                disabled={field.disabled}
                ref={field.ref}
                onChange={(e) => {
                    field.onChange(e)
                    if (props.onChange) {
                        props.onChange(e)
                    }
                }}
                onBlur={() => {
                    field.onBlur()
                    if (props.onBlur) {
                        props.onBlur()
                    }
                }}
                variant={'filled'}
                placeholder={props.placeholder}
                size={'xs'}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>

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
