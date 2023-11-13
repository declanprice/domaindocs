import { createSignal } from 'solid-js'

export type DocumentationView = {
    name: string
    folders: {
        name: string
        folderId: string
        position: number
        documents: {
            name: string
            documentId: string
            type: 'file' | 'whiteboard-editor' | 'text-editor'
        }[]
    }[]
}

export const [documentationView, setDocumentationView] =
    createSignal<DocumentationView | null>(null)

export const fetchDocumentationView = (options: {
    domainId?: string
    subDomainId?: string
    serviceId?: string
}) => {
    setDocumentationView(() => views['1'])
}

const views: { [key: string]: DocumentationView } = {
    '1': {
        name: 'My Domain Name',
        folders: [
            {
                position: 1,
                name: 'Folder 1',
                folderId: '1',
                documents: [
                    {
                        name: 'File 1',
                        type: 'file',
                        documentId: '1'
                    },
                    {
                        name: 'File 2',
                        type: 'file',
                        documentId: '2'
                    }
                ]
            },
            {
                position: 2,
                name: 'Folder 2',
                folderId: '2',
                documents: [
                    {
                        name: 'File 1',
                        type: 'file',
                        documentId: '1'
                    },
                    {
                        name: 'File 2',
                        type: 'file',
                        documentId: '2'
                    }
                ]
            },
            {
                position: 3,
                name: 'Folder 3',
                folderId: '3',
                documents: [
                    {
                        name: 'File 1',
                        type: 'file',
                        documentId: '1'
                    }
                ]
            }
        ]
    }
}
