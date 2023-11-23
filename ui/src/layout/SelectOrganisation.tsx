import { Button, Menu } from '@components'
import { BiSolidChevronDown } from 'solid-icons/bi'

export const SelectOrganisationMenu = () => {
    return (
        <Menu
            trigger={
                <Button
                    label={'Registers Of Scotland'}
                    class="font-bold bg-primary pl-4 pr-4"
                    rightIcon={<BiSolidChevronDown size={'24px'} />}
                />
            }
            items={[
                { label: 'Amazon Webservices', onClick: () => {} },
                { label: 'Burger King', onClick: () => {} }
            ]}
            content={
                <>
                    <div class="py-2">
                        <a
                            onClick={() => {}}
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </div>
                </>
            }
        ></Menu>
    )
}
