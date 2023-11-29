import { Button, Menu } from '@components'
import { BiSolidChevronDown } from 'solid-icons/bi'
import { twMerge } from 'tailwind-merge'
import { selectableOrganisations, selectedOrganisation, setSelectedOrganisation } from '@services'

export const SelectOrganisationMenu = (props: { buttonClass: string }) => {
    return (
        <Menu
            trigger={
                <Button
                    label={selectedOrganisation()?.name!}
                    class={twMerge('font-bold bg-primary text-xs pl-4 pr-4', props.buttonClass)}
                    rightIcon={<BiSolidChevronDown size={'18px'} />}
                />
            }
            items={selectableOrganisations().map((o) => ({
                label: o.name,
                onClick: () => {
                    setSelectedOrganisation(o)
                }
            }))}
            content={
                <div class="py-2">
                    <a
                        onClick={() => {}}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Settings
                    </a>
                </div>
            }
        ></Menu>
    )
}
