import { Select } from 'chakra-react-select';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

type FormSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    isLoading?: boolean;
    onChange?: (e: any) => void;
    onBlur?: () => void;
    isMulti?: boolean;
    components?: any;
};

export const FormSelect = (props: FormSelectProps) => {
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
                value={props.options.find((option) => option.value === field.value)}
                isDisabled={field.disabled}
                ref={field.ref}
                onChange={(e: any) => {
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
                isMulti={props.isMulti !== undefined ? props.isMulti : true}
                size={'sm'}
                isLoading={props.isLoading}
                placeholder={props.placeholder}
                options={props.options}
                components={props.components}
            />
        </Field>
    );
};
