import { twMerge } from 'tailwind-merge'
import { JSX, splitProps } from 'solid-js'

export type InputFieldProps = {
    name: string
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
    placeholder?: string
    value: string | undefined
    error: string
    required?: boolean
    disabled?: boolean
    ref: (element: HTMLInputElement) => void
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
    onChange: JSX.EventHandler<HTMLInputElement, Event>
    onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
    class?: string
}

export const InputField = (props: InputFieldProps) => {
    const [, inputProps] = splitProps(props, ['value', 'error'])

    return (
        <div class={twMerge(props.class, 'w-full flex flex-col')}>
            <input
                {...inputProps}
                class="bg-secondary placeholder-white text-white text-sm rounded-lg border-none w-full"
            />

            {props.error && <div class="text-sm text-red-500 mt-2 ml-1">{props.error}</div>}
        </div>
    )
}
