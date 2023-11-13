import { toId } from '@utils'
import { For } from 'solid-js'

type SelectFieldProps = {
    label: string
    items: { label: string; value: string }[]
    value: any
    onChange: (value: any) => void
}

export const SelectField = (props: SelectFieldProps) => {
    const { label, value, items, onChange } = props

    const selectId = toId(`${label}-select-field`)

    return (
        <>
            <label
                for={selectId}
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>

            <select
                id={selectId}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e: any) => {
                    onChange(e.target.value)
                }}
            >
                <For
                    each={items}
                    children={(item) => (
                        <option
                            selected={value === item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    )}
                />
            </select>
        </>
    )
}
