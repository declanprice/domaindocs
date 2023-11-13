import { useSearchParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import {
    documentationView,
    fetchDocumentationView
} from '../../services/documentation-view.service.ts'
import { toId } from '@utils'
import { Button } from '@components'

type DocumentationPageProps = {}

export const DocumentationPage = (props: DocumentationPageProps) => {
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
            <h1 class="text-lg font-bold">
                Documentation - {documentationView()?.name}
            </h1>

            {documentationView()?.folders.map((f) => (
                <div
                    id={`accordion-collapse-${toId(f.folderId)}`}
                    data-accordion="collapse"
                >
                    <h2 id={`accordion-collapse-heading-${toId(f.folderId)}`}>
                        <button
                            type="button"
                            class="mt-4 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                            data-accordion-target={`#accordion-collapse-body-${toId(
                                f.folderId
                            )}`}
                            aria-expanded="false"
                            aria-controls={`accordion-collapse-body-${toId(
                                f.folderId
                            )}`}
                        >
                            <span>{f.name}</span>
                            <svg
                                data-accordion-icon
                                class="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        class="hidden p-4"
                        id={`accordion-collapse-body-${toId(f.folderId)}`}
                        aria-labelledby={`accordion-collapse-heading-${toId(
                            f.folderId
                        )}`}
                    >
                        {f.documents.map((d) => (
                            <div class="max-w-sm mt-2 mb-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex">
                                <h4 class="flex-1">{d.name}</h4>

                                <div class="flex ">
                                    <Button label={'Open'} />
                                    <Button label={'Remove'} />
                                </div>
                            </div>
                        ))}

                        <a
                            class="ml-2 text-blue-500 cursor-pointer underline text-sm"
                            data-modal-target="new-document-modal"
                            data-modal-toggle="new-document-modal"
                        >
                            New Document
                        </a>
                    </div>
                </div>
            ))}

            <a
                class="mt-4 ml-4 text-blue-500 cursor-pointer underline text-sm"
                data-modal-target="new-folder-modal"
                data-modal-toggle="new-folder-modal"
            >
                New Folder
            </a>
        </div>
    )
}
