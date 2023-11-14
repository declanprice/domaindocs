export type InputFieldProps = {
    label: string
    value: string
    placeholder?: string
    disabled?: boolean
    onChange: (value: string) => void
    class?: string
}

export const InputField = (props: InputFieldProps) => {
    return (
        <div class={props.class}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
            <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder={props.placeholder}
                disabled={props.disabled}
                value={props.value}
                onChange={(e: any) => {
                    props.onChange(e.target.value)
                }}
            />
        </div>
    )
}
