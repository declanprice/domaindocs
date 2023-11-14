import { createSignal, For, JSX, onCleanup, onMount, Show } from 'solid-js'
import { toId } from '@utils'
import { twMerge } from 'tailwind-merge'

type MenuProps = {
    label: string
    items?: {
        label: string
        onClick: () => void
    }[]
    content?: JSX.Element
    iconButton?: boolean
    class?: string
}

export const Menu = (props: MenuProps) => {
    let ref: HTMLDivElement

    const [isOpen, setIsOpen] = createSignal(false)

    const menuToggleId = toId(`${props.label}-menu-toggle`)

    const menuId = toId(`${props.label}-menu`)

    const handleClick = (event: any) => {
        if (!ref.contains(event.target)) {
            setIsOpen(false)
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClick)
    })

    onCleanup(() => {
        document.removeEventListener('click', handleClick)
    })

    if (!props.items && !props.content)
        throw new Error('provide items or content')

    return (
        <>
            {props.iconButton ? (
                <button
                    id={menuToggleId}
                    onclick={() => {
                        setIsOpen(true)
                    }}
                    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                >
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                    >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </button>
            ) : (
                <button
                    id={menuToggleId}
                    onclick={() => {
                        setIsOpen(true)
                    }}
                    class={twMerge(
                        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                        props.class
                    )}
                    type="button"
                >
                    {props.label}
                    <svg
                        class="w-2.5 h-2.5 ms-3"
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
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
            )}

            <Show when={isOpen()}>
                <div
                    id={menuId}
                    class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby={menuToggleId}
                    >
                        <For
                            each={props.items}
                            children={(item) => (
                                <li>
                                    <a
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                            item.onClick()
                                            setIsOpen(false)
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )}
                        />
                    </ul>

                    {props.content}
                </div>
            </Show>
        </>
    )
}
