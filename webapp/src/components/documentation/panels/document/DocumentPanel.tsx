import { Box, Stack } from '@chakra-ui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Highlight } from '@tiptap/extension-highlight';

import './DocumentPanel.css';

import { DocumentBubbleMenu } from './menus/DocumentBubbleMenu';
import { DocumentFloatingMenu } from './menus/DocumentFloatingMenu';
import { DocumentSettingsSidebarActions } from './settings-sidebar/DocumentSettingsSidebarActions';
import { DocumentTitle } from './DocumentTitle';
import { DocumentSubtitle } from './DocumentSubtitle';
import { DocumentActions } from './DocumentActions';
import { DocumentContributors } from './DocumentContributors';
import { DocumentDocumentation, ViewDocumentation } from '@domaindocs/lib';

const extensions = [
    StarterKit,
    Highlight,
    TaskList,
    TaskItem,
    CharacterCount.configure({
        limit: 10000,
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
        <Box className="editor" py={14}>
            <Stack position={'relative'}>
                <DocumentActions />
                <DocumentTitle />
                <DocumentSubtitle />
                <DocumentContributors />
                <DocumentSettingsSidebarActions />
            </Stack>
            <EditorContent className="editor-content" width={'1200px'} editor={editor} />
            <DocumentBubbleMenu editor={editor} />
            <DocumentFloatingMenu editor={editor} />
        </Box>
    );
};
