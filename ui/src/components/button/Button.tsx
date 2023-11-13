import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    label: string
    target?: string
    class?: string
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            data-modal-target={props.target}
            data-modal-toggle={props.target}
            type="button"
            class={twMerge(
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
                props.class
            )}
            onclick={() => {
                if (props.onClick) {
                    props.onClick()
                }
            }}
        >
            {props.label}
        </button>
    )
}
