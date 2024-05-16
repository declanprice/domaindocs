import { Flex } from '@chakra-ui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Highlight } from '@tiptap/extension-highlight';

import './DocumentPanel.css';
import { DocumentBubbleMenu } from './DocumentBubbleMenu';
import { DocumentDocumentation } from '@domaindocs/lib';
import { DocumentToolbar } from './DocumentToolbar';
import { DocumentOutline } from './DocumentOutline';
import { DocumentTitle } from './DocumentTitle';
import { DocumentDetails } from './DocumentDetails';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { Collaboration } from '@tiptap/extension-collaboration';

const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:5000',
    name: 'example-document',
});

const extensions = [
    StarterKit,
    Highlight,
    TaskList,
    TaskItem,
    CharacterCount.configure({
        limit: 10000,
    }),
    Collaboration.configure({
        document: provider.document,
    }),
];

const content = '<p>Hello World!</p>';

type DocumentPanelProps = {
    document: DocumentDocumentation;
};

export const DocumentPanel = (props: DocumentPanelProps) => {
    const editor = useEditor({
        extensions,
        content,
    });

    if (!editor) return null;

    return (
        <Flex width="100%" flexDirection="column">
            <DocumentToolbar />

            <Flex py={8} px={2}>
                <DocumentOutline />

                <Flex flex={1} gap={2} flexDirection={'column'} alignItems={'center'}>
                    <DocumentTitle />
                    <DocumentDetails />
                    <EditorContent className={'editor-content'} editor={editor} />
                    <DocumentBubbleMenu editor={editor} />
                </Flex>
            </Flex>
        </Flex>
    );
};
