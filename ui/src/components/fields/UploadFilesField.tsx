import { toId } from '@utils'

type UploadFilesField = {
    label: string
    onChange: (files: FileList) => void
}

export const UploadFilesField = (props: UploadFilesField) => {
    const { label, onChange } = props

    const fieldId = toId(`${label}-uploadfiles-field`)
    const labelId = toId(`${label}-uploadfiles-label`)

    return (
        <>
            <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for={fieldId}
                id={labelId}
            >
                {label}
            </label>

            <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={fieldId}
                type="file"
                multiple
                onChange={(e) => {
                    onChange(e.target.files)
                }}
            />
        </>
    )
}
