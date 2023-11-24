import { createSignal, Show } from 'solid-js'
import { FiMenu } from 'solid-icons/fi'

export const Navbar = () => {
    const [isNavBarOpen, setIsNavBarOpen] = createSignal(false)

    return (
        <>
            <FiMenu
                onClick={() => {
                    setIsNavBarOpen(true)
                }}
            />

            <Show when={isNavBarOpen()}>
                <div class="absolute left-0 bottom-0 w-full h-full bg-primary opacity-60">
                    <div class="bg-primary w-[300px] flex flex-col h-full left-0 bottom-0">content</div>
                </div>
            </Show>
        </>
    )
}
