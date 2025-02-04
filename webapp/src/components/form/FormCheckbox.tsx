import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';
import { Checkbox } from '../ui/checkbox';

type FormCheckboxProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
};

export const FormCheckbox = (props: FormCheckboxProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <Field
            disabled={field.disabled}
            label={props.label}
            helperText={props.helperText}
            errorText={fieldState?.error?.message}
            invalid={fieldState.invalid}
        >
            <Checkbox
                name={field.name}
                value={field.value}
                checked={field.value == true}
                disabled={field.disabled}
                ref={field.ref}
                onChange={(e: any) => {
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
                placeholder={props.placeholder}
            />
        </Field>
    );
};
