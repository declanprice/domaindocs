import { Menu as ArkMenu } from '@ark-ui/solid'
import { For } from 'solid-js'

type MenuProps = {
    label: string
    items: {
        label: string
        onClick: () => void
    }[]
}

export const Menu = (props: MenuProps) => {
    const { label, items } = props

    return (
        <ArkMenu.Root>
            <div class="relative inline-block text-left p-2">
                <ArkMenu.Trigger class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {label}
                </ArkMenu.Trigger>
                <ArkMenu.Positioner>
                    <ArkMenu.Content class="z-10  w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <For
                            each={items}
                            children={(item) => (
                                <ArkMenu.Item
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    id="search"
                                    onclick={item.onClick}
                                >
                                    {item.label}
                                </ArkMenu.Item>
                            )}
                        />
                    </ArkMenu.Content>
                </ArkMenu.Positioner>
            </div>
        </ArkMenu.Root>
    )
}
