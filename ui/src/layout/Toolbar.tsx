import { UserMenu } from './UserMenu.tsx'
import { SelectOrganisationMenu } from './SelectOrganisation.tsx'
import { IoNotificationsOutline } from 'solid-icons/io'
import { Show } from 'solid-js'
import { matches } from '@utils'
import { Navbar } from './Navbar.tsx'

export const Toolbar = () => {
    return (
        <div class="flex bg-white shadow items-center p-4" style={{ height: '60px' }}>
            <Navbar />

            <Show when={matches.sm}>
                <div class="ml-8">
                    <SelectOrganisationMenu />
                </div>
            </Show>

            <IoNotificationsOutline class="text-primary mr-8 ml-auto" size="18px" />

            <UserMenu />
        </div>
    )
}
