import { createSignal, ParentProps, Show } from 'solid-js'
import { toId } from '@utils'

export type CollapseProps = {
    folderName: string
} & ParentProps

export const Collapse = (props: CollapseProps) => {
    const collapseId = toId(`collapse-${props.folderName}`)
    const collapseHeadingId = toId(`collapse-heading-${props.folderName}`)
    const collapseBodyId = toId(`collapse-body-${props.folderName}`)
    const [isOpen, setIsOpen] = createSignal<boolean>(false)

    return (
        <>
            <div id={collapseId}>
                <h2 id={collapseHeadingId}>
                    <button
                        type="button"
                        class="mt-4 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        aria-expanded="false"
                        aria-controls={collapseBodyId}
                        onclick={() => {
                            setIsOpen((isOpen) => !isOpen)
                        }}
                    >
                        <span>{props.folderName}</span>
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
                <Show when={isOpen()}>
                    <div
                        class="p-4"
                        id={collapseBodyId}
                        aria-labelledby={collapseHeadingId}
                    >
                        {props.children}
                    </div>
                </Show>
            </div>
        </>
    )
}
