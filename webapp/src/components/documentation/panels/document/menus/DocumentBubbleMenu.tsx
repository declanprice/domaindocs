import { BubbleMenu, Editor, FloatingMenu } from '@tiptap/react';

type DocumentBubbleMenuProps = {
    editor: Editor;
};

export const DocumentBubbleMenu = (props: DocumentBubbleMenuProps) => {
    return <BubbleMenu editor={props.editor}>bubble menu </BubbleMenu>;
};
