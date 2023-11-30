import { Button, Menu } from '@components'
import { BiSolidChevronDown } from 'solid-icons/bi'
import { twMerge } from 'tailwind-merge'
import { selectableOrganisations, selectedOrganisation, setSelectedOrganisation } from '@services'
import { useNavigate } from '@solidjs/router'

export const SelectOrganisationMenu = (props: { buttonClass?: string }) => {
    const nav = useNavigate()

    return (
        <Menu
            trigger={
                <Button
                    label={selectedOrganisation()?.name!}
                    class={twMerge('font-bold bg-primary text-xs p-3', props.buttonClass)}
                    rightIcon={<BiSolidChevronDown size={'18px'} />}
                />
            }
            items={selectableOrganisations().map((o) => ({
                label: o.name,
                onClick: () => {
                    setSelectedOrganisation(o)
                    nav(`/organisation/${o.id}`)
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
