import { createEffect, createSignal, For, Show } from 'solid-js'
import { FiMenu } from 'solid-icons/fi'
import { IoDocument } from 'solid-icons/io'
import { SelectOrganisationMenu } from './SelectOrganisation.tsx'
import { selectedOrganisation } from '@services'

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
                <div
                    style={{ width: '280px' }}
                    class="overflow-auto absolute left-0 bottom-0 w-full h-full bg-primary flex flex-col h-full left-0 bottom-0 z-20 items-center p-8"
                >
                    <IoDocument size={'4rem'} color="white" />

                    <h3 class="text-white text-xl font-bold mt-4 mb-8">Domaindocs</h3>

                    <SelectOrganisationMenu buttonClass="bg-secondary text-white w-48" />

                    <nav class="flex flex-col items-start w-full p-4 mt-6 flex-1">
                        <a class="text-sm text-highlight">Organisation</a>
                        <a class="text-sm text-white mt-6">Domains</a>
                        <For
                            each={selectedOrganisation()?.domains}
                            children={(domain) => (
                                <>
                                    <a class="text-sm text-white mt-6 ml-4">{domain.name}</a>
                                </>
                            )}
                        />
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
