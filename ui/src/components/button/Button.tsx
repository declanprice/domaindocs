import { twMerge } from 'tailwind-merge'
import { JSX } from 'solid-js'

type ButtonProps = {
    label: string
    type?: 'button' | 'submit' | 'reset'
    class?: string
    disabled?: boolean
    onClick?: () => void
    rightIcon?: JSX.Element
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            class={twMerge(
                'text-white text-sm bg-secondary focus:ring-4 font-medium rounded-lg p-2',
                props.class,
                props.disabled && 'bg-gray-400'
            )}
            disabled={props.disabled}
            type={props.type ? props.type : 'button'}
            onClick={() => {
                if (props.onClick) {
                    props.onClick()
                }
            }}
        >
            <div class="flex items-center">
                {props.label}

                {props.rightIcon && <div class="ml-2">{props.rightIcon}</div>}
            </div>
        </button>
    )
}
