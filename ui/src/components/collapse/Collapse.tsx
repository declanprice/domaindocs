import { createSignal, ParentProps, Show } from 'solid-js'

export type CollapseProps = {
    folderName: string
} & ParentProps

export const Collapse = (props: CollapseProps) => {
    const [isOpen, setIsOpen] = createSignal<boolean>(false)

    return (
        <>
            <div>
                <h2>
                    <button
                        class="mt-4 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        type="button"
                        aria-expanded="false"
                        onclick={() => {
                            setIsOpen((isOpen) => !isOpen)
                        }}
                    >
                        <span>{props.folderName}</span>
                        <svg
                            class="w-3 h-3 rotate-180 shrink-0"
                            data-accordion-icon
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
                    <div class="p-4">{props.children}</div>
                </Show>
            </div>
        </>
    )
}
