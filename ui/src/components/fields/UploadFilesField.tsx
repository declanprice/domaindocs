import { toId } from '@utils'

type UploadFilesField = {
    label: string
    onChange: (files: FileList | null) => void
}

export const UploadFilesField = (props: UploadFilesField) => {
    const fieldId = toId(`${props.label}-uploadfiles-field`)
    const labelId = toId(`${props.label}-uploadfiles-label`)

    return (
        <>
            <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for={fieldId}
                id={labelId}
            >
                {props.label}
            </label>

            <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={fieldId}
                type="file"
                multiple
                onChange={(e) => {
                    props.onChange(e.target.files)
                }}
            />
        </>
    )
}
