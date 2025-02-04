import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';
import { MenuCheckboxItem, MenuContent, MenuItemGroup, MenuRadioItem, MenuRoot, MenuTrigger } from '../ui/menu';
import { useCheckboxGroup } from '@chakra-ui/react';

type FormMenuCheckboxSelectProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    options: { value: string; label: string }[];
    onChange?: (e: any) => void;
    onBlur?: () => void;
    renderButton: (option?: { value: string; label: string }) => any;
    renderOption: (option: { value: string; label: string }) => any;
};

export const FormMenuCheckboxSelect = (props: FormMenuCheckboxSelectProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
    });

    const group = useCheckboxGroup({
        defaultValue: field.value,
        onValueChange: (value: any[]) => {
            field.onChange(value);
            if (props.onChange) {
                props.onChange(value);
            }
        },
    });

    const renderMenuButton = () => {
        const option = props.options.find((option) => option.value === field.value);
        return <>{props.renderButton(option)}</>;
    };

    return (
        <Field
            disabled={field.disabled}
            label={props.label}
            helperText={props.helperText}
            errorText={fieldState?.error?.message}
            invalid={fieldState.invalid}
            onBlur={() => {
                field.onBlur();
                if (props.onBlur) {
                    props.onBlur();
                }
            }}
            width={'fit'}
        >
            <MenuRoot>
                <MenuTrigger as={'div'}>{renderMenuButton()}</MenuTrigger>

                <MenuContent>
                    <MenuItemGroup>
                        {props.options.map((option) => (
                            <MenuCheckboxItem
                                key={option.value}
                                value={option.value}
                                checked={group.isChecked(option.value)}
                                onCheckedChange={() => {
                                    group.toggleValue(option.value);
                                }}
                            >
                                {props.renderOption(option)}
                            </MenuCheckboxItem>
                        ))}
                    </MenuItemGroup>
                </MenuContent>
            </MenuRoot>
        </Field>
    );
};
