import { createEffect, createSignal, Show } from 'solid-js'
import { FiMenu } from 'solid-icons/fi'

export const Navbar = () => {
    const [isNavBarOpen, setIsNavBarOpen] = createSignal(false)

    const handleEsc = (event: any) => {
        if (isNavBarOpen() && event.key === 'Escape') {
            setIsNavBarOpen(false)
        }
    }

    createEffect(() => {
        if (!isNavBarOpen()) {
            document.removeEventListener('keyup', handleEsc)
        }
    })

    return (
        <>
            <FiMenu
                onClick={() => {
                    setIsNavBarOpen(true)

                    document.addEventListener('keyup', handleEsc)
                }}
            />

            <Show when={isNavBarOpen()}>
                <div class="absolute left-0 bottom-0 w-full h-full bg-primary w-[300px] flex flex-col h-full left-0 bottom-0 z-20">
                    content
                </div>
                <div
                    onClick={() => {
                        setIsNavBarOpen(false)
                    }}
                    class="absolute right-0 bottom-0 w-full h-full flex-1 bg-primary opacity-60 z-10"
                ></div>
            </Show>
        </>
    )
}
