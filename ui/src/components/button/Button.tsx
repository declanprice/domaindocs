import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    label: string
    type?: 'button' | 'submit' | 'reset'
    class?: string
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            class={twMerge(
                'text-white text-sm bg-secondary w-full focus:ring-4 font-medium rounded-lg p-2',
                props.class
            )}
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
