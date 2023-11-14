import { useNavigate, useSearchParams } from '@solidjs/router'
import { createEffect, createSignal, For } from 'solid-js'
import { documentationView, fetchDocumentationView } from '../../services/documentation-view.service.ts'
import { Collapse, Menu } from '@components'
import { NewFolderModal } from './components/NewFolderModal.tsx'

export const DocumentationPage = () => {
    const nav = useNavigate()

    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = createSignal<boolean>(false)

    const [searchParams] = useSearchParams()

    createEffect(() => {
        fetchDocumentationView({
            domainId: searchParams.domainId,
            subDomainId: searchParams.subDomainId,
            serviceId: searchParams.serviceId
        })
    })

    return (
        <div class="flex flex-col p-4">
            <h1 class="text-lg font-bold">Documentation - {documentationView()?.name}</h1>

            <For
                each={documentationView()?.folders}
                children={(f) => (
                    <Collapse folderName={f.name}>
                        {f.documents.map((d) => (
                            <div class="max-w-sm mt-2 mb-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex">
                                <h4 class="flex-1">{d.name}</h4>

                                <div class="flex ">
                                    <a class="mt-4 ml-4 text-blue-500 cursor-pointer underline text-sm">Open</a>
                                    <a class="mt-4 ml-4 text-blue-500 cursor-pointer underline text-sm">Remove</a>
                                </div>
                            </div>
                        ))}

                        <Menu
                            label={`Add Document to ${f.name}`}
                            items={[
                                {
                                    label: 'File',
                                    onClick: () => {
                                        nav(`/documentation/${f.folderId}/upload-files`)
                                    }
                                },
                                {
                                    label: 'Text Editor',
                                    onClick: () => {
                                        nav(`/documentation/${f.folderId}/text-editor`)
                                    }
                                }
                            ]}
                        />
                    </Collapse>
                )}
            />

            <a
                class="mt-4 ml-4 text-blue-500 cursor-pointer underline text-sm"
                onclick={() => {
                    setIsNewFolderModalOpen(true)
                }}
            >
                New Folder
            </a>

            <NewFolderModal
                isOpen={isNewFolderModalOpen()}
                onClose={() => {
                    setIsNewFolderModalOpen(false)
                }}
            />
        </div>
    )
}

export default DocumentationPage
