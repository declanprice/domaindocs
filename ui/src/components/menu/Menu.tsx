// type MenuProps = {
//     label?: string
//     items?: {
//         label: string
//         onClick: () => void
//     }[]
//     trigger?: JSX.Element
//     content?: JSX.Element
//     iconButton?: boolean
//     class?: string
// }

export const Menu = () => {
    // const [isOpen, setIsOpen] = createSignal(false)

    return (
        <>
            {/*<ArkMenu.Root open={isOpen()}>*/}
            {/*    <ArkMenu.Trigger>*/}
            {/*        {props.trigger ? (*/}
            {/*            <>{props.trigger}</>*/}
            {/*        ) : (*/}
            {/*            <>*/}
            {/*                {props.iconButton ? (*/}
            {/*                    <button*/}
            {/*                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"*/}
            {/*                        type="button"*/}
            {/*                        onclick={() => {*/}
            {/*                            setIsOpen((open) => !open)*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <svg*/}
            {/*                            class="w-5 h-5"*/}
            {/*                            aria-hidden="true"*/}
            {/*                            xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            fill="currentColor"*/}
            {/*                            viewBox="0 0 4 15"*/}
            {/*                        >*/}
            {/*                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />*/}
            {/*                        </svg>*/}
            {/*                    </button>*/}
            {/*                ) : (*/}
            {/*                    <button*/}
            {/*                        class={twMerge(*/}
            {/*                            'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',*/}
            {/*                            props.class*/}
            {/*                        )}*/}
            {/*                        type="button"*/}
            {/*                        onClick={() => {*/}
            {/*                            setIsOpen((open) => !open)*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        {props.label}*/}
            {/*                        <svg*/}
            {/*                            class="w-2.5 h-2.5 ms-3"*/}
            {/*                            aria-hidden="true"*/}
            {/*                            xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            fill="none"*/}
            {/*                            viewBox="0 0 10 6"*/}
            {/*                        >*/}
            {/*                            <path*/}
            {/*                                stroke="currentColor"*/}
            {/*                                stroke-linecap="round"*/}
            {/*                                stroke-linejoin="round"*/}
            {/*                                stroke-width="2"*/}
            {/*                                d="m1 1 4 4 4-4"*/}
            {/*                            />*/}
            {/*                        </svg>*/}
            {/*                    </button>*/}
            {/*                )}*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </ArkMenu.Trigger>*/}
            {/*    <ArkMenu.Positioner>*/}
            {/*        <ArkMenu.Content>*/}
            {/*            <div class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">*/}
            {/*                {props.items && (*/}
            {/*                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">*/}
            {/*                        <For*/}
            {/*                            each={props.items}*/}
            {/*                            children={(item) => (*/}
            {/*                                <li>*/}
            {/*                                    <a*/}
            {/*                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
            {/*                                        onClick={() => {*/}
            {/*                                            item.onClick()*/}
            {/*                                        }}*/}
            {/*                                    >*/}
            {/*                                        {item.label}*/}
            {/*                                    </a>*/}
            {/*                                </li>*/}
            {/*                            )}*/}
            {/*                        />*/}
            {/*                    </ul>*/}
            {/*                )}*/}

            {/*                {props.content}*/}
            {/*            </div>*/}
            {/*        </ArkMenu.Content>*/}
            {/*    </ArkMenu.Positioner>*/}
            {/*</ArkMenu.Root>*/}
        </>
    )
}
