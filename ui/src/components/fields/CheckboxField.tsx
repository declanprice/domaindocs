import { toId } from '@utils'

type CheckboxFieldProps = {
    label: string
    isChecked: boolean
    onChange: (isChecked: boolean) => void
}

export const CheckboxField = (props: CheckboxFieldProps) => {
    const { label, isChecked, onChange } = props

    const id = toId(`${label}-checkbox-field`)

    return (
        <div class="m-4 flex items-center justify-center content-center">
            <div class="flex">
                <input
                    class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    aria-describedby={`${label}-description`}
                    name={label}
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={(e: any) => {
                        onChange(e.target.checked)
                    }}
                />
            </div>
            <div class="ml-3 text-sm">
                <label for={id} class="font-medium text-gray-900">
                    {label}
                </label>
            </div>
        </div>
    )
}
