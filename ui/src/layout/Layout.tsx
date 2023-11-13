import { ParentProps } from 'solid-js'
import { authService, domainsService } from '@services'
import { Button, Menu } from '@components'

import { UserMenu } from './UserMenu.tsx'

export const Layout = (props: ParentProps) => {
    const authUser = authService.authUser()
    const domains = domainsService.domains()

    if (!authUser || !domains) return null

    return (
        <div class="flex flex-col h-full">
            <div class="flex m-4 pb-4 border-b-2 border-b-gray-200">
                <div class="flex-1">
                    <Menu
                        label={'My Domain Name'}
                        items={domains.map((d) => ({
                            label: d.name,
                            onClick: () => {}
                        }))}
                        content={
                            <>
                                <div class="py-2">
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Settings
                                    </a>
                                </div>
                            </>
                        }
                    />

                    <Button class="ml-2" label={'Manage Teams'} />
                </div>

                <div class="flex mr-2">
                    <UserMenu authUser={authUser} />
                </div>
            </div>

            <div class="flex-1">{props.children}</div>
        </div>
    )
}
