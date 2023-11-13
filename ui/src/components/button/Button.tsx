import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    label: string
    target?: string
    class?: string
}

export const Button = (props: ButtonProps) => {
    const { label, class: clazz, target } = props

    return (
        <button
            data-modal-target={target}
            data-modal-toggle={target}
            type="button"
            class={twMerge(
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
                clazz
            )}
        >
            {label}
        </button>
    )
}
