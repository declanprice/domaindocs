import { Menu as ArkMenu } from '@ark-ui/solid'
import { For, JSX } from 'solid-js'

type MenuProps = {
    label?: string
    items?: {
        label: string
        onClick: () => void
    }[]
    trigger?: JSX.Element
    content?: JSX.Element
    iconButton?: boolean
    class?: string
}

export const Menu = (props: MenuProps) => {
    return (
        <>
            <ArkMenu.Root>
                <ArkMenu.Trigger class="focus:outline-none">{props.trigger}</ArkMenu.Trigger>
                <ArkMenu.Positioner>
                    <ArkMenu.Content class="focus:outline-none">
                        <div class="bg-white divide-y divide-gray-100 rounded-lg shadow">
                            {props.items && (
                                <ul class="py-2 text-sm text-gray-700">
                                    <For
                                        each={props.items}
                                        children={(item) => (
                                            <li>
                                                <a
                                                    class="block px-4 py-2 hover:bg-gray-100 mt-2 cursor-pointer"
                                                    onClick={() => {
                                                        item.onClick()
                                                    }}
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        )}
                                    />
                                </ul>
                            )}

                            {props.content}
                        </div>
                    </ArkMenu.Content>
                </ArkMenu.Positioner>
            </ArkMenu.Root>
        </>
    )
}
