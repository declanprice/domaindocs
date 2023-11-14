import { Button } from '@components'

import EditorJS from '@editorjs/editorjs'
// import Paragraph from '@editorjs/paragraph'
// import Header from '@editorjs/header'
// import Quote from '@editorjs/quote'
// import Warning from '@editorjs/warning'
// import Delimiter from '@editorjs/delimiter'
// import Checklist from '@editorjs/checklist'
// import ImageTool from '@editorjs/image'
// import Table from '@editorjs/table'

export const DocumentationTextEditorPage = () => {
    new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        placeholder: 'Type here',
        tools: {
            // quote: Quote,
            // header: Header,
            // paragraph: Paragraph,
            // warning: Warning,
            // delimiter: Delimiter,
            // checklist: Checklist,
            // image: ImageTool,
            // table: Table
        }
    })

    return (
        <div class="flex flex-col p-4">
            <div id={'editorjs'}></div>

            <div class="mt-4 flex justify-end">
                <Button label={'Cancel'} class="bg-red-500" />
                <Button label={'Save'} />
            </div>
        </div>
    )
}
