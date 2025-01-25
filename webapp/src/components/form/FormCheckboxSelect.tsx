import { Select } from 'chakra-react-select';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

type FormCheckboxSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
    isMulti?: boolean;
    components?: any;
};

export const FormCheckboxSelect = (props: FormCheckboxSelectProps) => {
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
        </Field>
    );
};
