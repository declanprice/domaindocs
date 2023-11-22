import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    label: string
    type?: 'button' | 'submit' | 'reset'
    class?: string
    disabled?: boolean
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            class={twMerge(
                'text-white text-sm bg-secondary w-full focus:ring-4 font-medium rounded-lg p-2',
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
            {props.label}
        </button>
    )
}
