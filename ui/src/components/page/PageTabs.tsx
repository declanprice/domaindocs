import { Tabs } from '@ark-ui/solid'
import { createSignal, For, JSX } from 'solid-js'
import { twMerge } from 'tailwind-merge'

type PageTabsProps = {
    items: {
        label: string
        content: JSX.Element
    }[]
}

export const PageTabs = (props: PageTabsProps) => {
    const [value, setValue] = createSignal<string>('Overview')

    const isActive = (label: string) => {
        return value() === label
    }

    return (
        <Tabs.Root value={value()} onValueChange={(e) => setValue(e.value)}>
            <Tabs.List class="w-full bg-white rounded-lg p-1 shadow my-2">
                <For
                    each={props.items}
                    children={(item) => (
                        <Tabs.Trigger
                            class={twMerge(
                                'rounded-lg text-primary font-bold m-2 pl-4 pr-4 pt-2 pb-2',
                                isActive(item.label) && ['bg-secondary', 'text-white']
                            )}
                            value={item.label}
                        >
                            {item.label}
                        </Tabs.Trigger>
                    )}
                />
            </Tabs.List>

            <For
                each={props.items}
                children={(item) => <Tabs.Content value={item.label}>{item.content}</Tabs.Content>}
            />
        </Tabs.Root>
    )
}
