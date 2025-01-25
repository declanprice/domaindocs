import { MenuTrigger, MenuContent, Menu, MenuItemGroup, MenuCheckboxItem, MenuRadioItem } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';

type FormMenuSelectProps = {
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
    multi?: boolean;
};

export const FormMenuSelect = (props: FormMenuSelectProps) => {
    const { field, fieldState } = useController({
        name: props.name,
        control: props.control,
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
        >
            <Menu.Root>
                <MenuTrigger type={'button'}>{renderMenuButton()}</MenuTrigger>

                <MenuContent>
                    <MenuItemGroup
                        type={props.multi ? 'checkbox' : 'radio'}
                        value={field.value}
                        onChange={(e: any) => {
                            console.log(e);
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
                    >
                        {props.multi
                            ? props.options.map((option) => (
                                  <MenuCheckboxItem value={option.value}>{props.renderOption(option)}</MenuCheckboxItem>
                              ))
                            : props.options.map((option) => (
                                  <MenuRadioItem value={option.value}>{props.renderOption(option)}</MenuRadioItem>
                              ))}
                    </MenuItemGroup>
                </MenuContent>
            </Menu.Root>
        </Field>
    );
};
