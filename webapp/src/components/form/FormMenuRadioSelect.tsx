import { Control, useController } from 'react-hook-form';
import { Field } from '../ui/field';
import {
    MenuCheckboxItem,
    MenuContent,
    MenuItemGroup,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuRoot,
    MenuTrigger,
} from '../ui/menu';
import { useCheckboxGroup } from '@chakra-ui/react';

type FormMenuRadioSelectProps = {
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

export const FormMenuRadioSelect = (props: FormMenuRadioSelectProps) => {
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
            onBlur={() => {
                field.onBlur();
                if (props.onBlur) {
                    props.onBlur();
                }
            }}
        >
            <MenuRoot>
                <MenuTrigger as={'div'}>{renderMenuButton()}</MenuTrigger>

                <MenuContent>
                    <MenuRadioItemGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder={props.placeholder}
                    >
                        {props.options.map((option) => (
                            <MenuRadioItem key={option.value} value={option.value}>
                                {props.renderOption(option)}
                            </MenuRadioItem>
                        ))}
                    </MenuRadioItemGroup>
                </MenuContent>
            </MenuRoot>
        </Field>
    );
};
