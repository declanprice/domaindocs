import { createEffect, createSignal, Show } from 'solid-js'
import { FiMenu } from 'solid-icons/fi'
import { IoDocument } from 'solid-icons/io'
import { SelectOrganisationMenu } from './SelectOrganisation.tsx'

export const Navbar = () => {
    const [isNavBarOpen, setIsNavBarOpen] = createSignal(true)

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
                <div
                    style={{ width: '280px' }}
                    class="absolute left-0 bottom-0 w-full h-full bg-primary flex flex-col h-full left-0 bottom-0 z-20 items-center p-8"
                >
                    <IoDocument size={'4rem'} color="white" />

                    <h3 class="text-white text-xl font-bold mt-4">Domaindocs</h3>

                    <SelectOrganisationMenu buttonClass="bg-secondary p-3 mt-4 w-48" />

                    <nav class="flex flex-col items-start w-full p-4 mt-6 flex-1">
                        <a class="text-sm text-highlight">Organisation</a>
                        <a class="text-sm text-white mt-6">Domains</a>
                        <a class="text-sm text-white mt-6 ml-4">Restaurant</a>
                        <a class="text-sm text-white mt-6 ml-4">Order</a>
                        <a class="text-sm text-white mt-6 ml-4">Customer</a>
                        <a class="text-sm text-white mt-6">People Management</a>
                        <a class="text-sm text-white mt-6">Onboarding</a>
                    </nav>

                    <nav class="flex flex-col items-start w-full p-4 mt-6">
                        <a class="text-sm text-white mt-6">Invite People</a>
                        <a class="text-sm text-white mt-6">Settings</a>
                    </nav>
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
