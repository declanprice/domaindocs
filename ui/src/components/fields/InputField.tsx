import { toId } from '@utils'

export type InputFieldProps = {
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

export const InputField = (props: InputFieldProps) => {
    const { label, placeholder, value, onChange } = props

    const id = toId(`${label}-input-field`)

    return (
        <div class="relative m-4">
            <label
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                for={id}
            >
                {label}
            </label>
            <input
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name={label}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value)
                }}
            />
        </div>
    )
}
