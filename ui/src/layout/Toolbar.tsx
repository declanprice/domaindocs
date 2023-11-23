import { FiMenu } from 'solid-icons/fi'
import { UserMenu } from './UserMenu.tsx'
import { SelectOrganisationMenu } from './SelectOrganisation.tsx'
import { IoNotificationsOutline } from 'solid-icons/io'

export const Toolbar = () => {
    return (
        <div class="flex bg-white shadow items-center p-4" style={{ height: '60px' }}>
            <FiMenu />

            <div class="ml-8 flex-1">
                <SelectOrganisationMenu />
            </div>

            <IoNotificationsOutline class="text-primary mr-8" size="18px" />

            <UserMenu />
        </div>
    )
}
