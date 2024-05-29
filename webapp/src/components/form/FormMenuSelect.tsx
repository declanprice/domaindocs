import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormControlProps,
    Menu,
    MenuOptionGroup,
    MenuItemOption,
    MenuList,
    MenuButton,
} from '@chakra-ui/react';

import { Control, useController } from 'react-hook-form';
import { getFontSize } from '../../util/getFontSize';

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
} & Partial<FormControlProps>;

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
        <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
            {props.label && <FormLabel fontSize={getFontSize(props.size)}>{props.label}</FormLabel>}

            <Menu>
                <MenuButton type={'button'}>{renderMenuButton()}</MenuButton>

                <MenuList>
                    <MenuOptionGroup
                        type={props.multi ? 'checkbox' : 'radio'}
                        value={field.value}
                        onChange={(e) => {
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
                        {props.options.map((option) => (
                            <MenuItemOption fontSize={getFontSize(props.size)} value={option.value}>
                                {props.renderOption(option)}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                </MenuList>
            </Menu>

            {props.helperText && <FormHelperText fontSize={12}>{props.helperText}</FormHelperText>}

            {fieldState.error && <FormErrorMessage fontSize={12}>{fieldState.error.message}</FormErrorMessage>}
        </FormControl>
    );
};
