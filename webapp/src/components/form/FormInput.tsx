import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from '@chakra-ui/react'

import { Control, useController } from 'react-hook-form'


type FormTextInputProps = {
    name: string,
    placeholder?: string,
    control: Control
    label?: string,
    helperText?: string
}

export const FormTextInput = (props: FormTextInputProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control
    })

    return <FormControl isInvalid={fieldState.invalid}>
        {props.label && (<FormLabel>{props.label}</FormLabel>) }

        <Input name={field.name}
               value={field.value}
               isDisabled={field.disabled}
               disabled={field.disabled}
               ref={field.ref}
               onChange={field.onChange}
               onBlur={field.onBlur}
               variant={'filled'}
               placeholder={props.placeholder}
               size={'sm'}
        />

        {props.helperText && (<FormHelperText>{props.helperText}</FormHelperText>) }

        {fieldState.error && (<FormErrorMessage>{fieldState.error.message}</FormErrorMessage>)}
    </FormControl>
}