import { Button, Menu } from '@components'
import { BiSolidChevronDown } from 'solid-icons/bi'
import { twMerge } from 'tailwind-merge'

export const SelectOrganisationMenu = (props: { buttonClass: string }) => {
    return (
        <Menu
            trigger={
                <Button
                    label={'Registers Of Scotland'}
                    class={twMerge('font-bold bg-primary text-xs pl-4 pr-4', props.buttonClass)}
                    rightIcon={<BiSolidChevronDown size={'18px'} />}
                />
            }
            items={[
                { label: 'Amazon Webservices', onClick: () => {} },
                { label: 'Burger King', onClick: () => {} }
            ]}
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
