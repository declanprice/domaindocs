import { Flex } from '@chakra-ui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Highlight } from '@tiptap/extension-highlight';
import './DocumentPanel.css';
import { DocumentBubbleMenu } from './DocumentBubbleMenu';
import { DetailedDocumentation } from '@domaindocs/lib';
import { DocumentToolbar } from './DocumentToolbar';
import { DocumentTitle } from './DocumentTitle';
import { DocumentDetails } from './DocumentDetails';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { Collaboration } from '@tiptap/extension-collaboration';

type DocumentPanelProps = {
    toolbar?: boolean;
    documentation: DetailedDocumentation;
};

export const DocumentPanel = (props: DocumentPanelProps) => {
    const { documentation, toolbar } = props;

    const provider = new HocuspocusProvider({
        url: 'ws://127.0.0.1:5000',
        name: documentation.documentationId,
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

    const editor = useEditor({
        extensions,
    });

    if (!editor) return null;

    return (
        <Flex width="100%" flexDirection="column">
            {toolbar !== false && <DocumentToolbar />}

            <Flex py={8} px={2} flexDirection={'column'} alignItems={'center'}>
                <DocumentTitle title={documentation.name} />
                <DocumentDetails
                    createdAt={documentation.createdAt}
                    updatedAt={documentation.updatedAt}
                    createdBy={documentation.createdBy}
                />
                <EditorContent className={'editor-content'} editor={editor} />
                <DocumentBubbleMenu editor={editor} />
            </Flex>
        </Flex>
    );
};
