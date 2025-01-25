import { CreatableProps, CreatableSelect } from 'chakra-react-select';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

type FormCreateSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
    onCreateOption?: (value: string) => void;
    isMulti?: boolean;
    selectProps?: CreatableProps<any, any, any>;
};

export const FormCreateSelect = (props: FormCreateSelectProps) => {
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
            <CreatableSelect
                name={field.name}
                value={props.options.find((option) => option.value === field.value)}
                isDisabled={field.disabled}
                ref={field.ref}
                onChange={(e) => {
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
                onCreateOption={props.onCreateOption}
                isMulti={props.isMulti !== undefined ? props.isMulti : true}
                size="sm"
                placeholder={props.placeholder}
                options={props.options}
                {...props.selectProps}
            />
        </Field>
    );
};
