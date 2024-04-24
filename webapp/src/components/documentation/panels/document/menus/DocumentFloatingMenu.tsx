import { Editor, FloatingMenu } from '@tiptap/react';

type DocumentFloatingMenuProps = {
    editor: Editor;
};

export const DocumentFloatingMenu = (props: DocumentFloatingMenuProps) => {
    return <FloatingMenu editor={props.editor}>floating menu </FloatingMenu>;
};
