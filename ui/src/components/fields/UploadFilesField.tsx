type UploadFilesField = {
    label: string
    onChange: (files: FileList | null) => void
}

export const UploadFilesField = (props: UploadFilesField) => {
    return (
        <>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>

            <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                multiple
                onChange={(e) => {
                    props.onChange(e.target.files)
                }}
            />
        </>
    )
}
