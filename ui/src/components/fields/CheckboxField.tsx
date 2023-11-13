import { toId } from '@utils'

type CheckboxFieldProps = {
    label: string
    value: boolean
    onChange: (isChecked: boolean) => void
    disabled?: boolean
}

export const CheckboxField = (props: CheckboxFieldProps) => {
    const checkboxId = toId(`${props.label}-checkbox-field`)

    const labelId = toId(`${props.label}-checkbox-label`)

    return (
        <div class="flex items-center mb-4">
            <input
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                id={checkboxId}
                checked={props.value}
                disabled={props.disabled}
                onChange={(e: any) => {
                    props.onChange(e.target.checked)
                }}
            />

            <label
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for={checkboxId}
                id={labelId}
            >
                {props.label}
            </label>
        </div>
    )
}
