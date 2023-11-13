import { ParentProps } from 'solid-js'
import {
    authUser,
    fetchSelectableDomains,
    selectableDomains,
    selectedDomain
} from '@services'
import { Button, Menu } from '@components'
import { useNavigate } from '@solidjs/router'
import { UserMenu } from './UserMenu.tsx'

export const Layout = (props: ParentProps) => {
    const nav = useNavigate()

    return (
        <div class="flex flex-col h-full">
            <div class="flex m-4 pb-4 border-b-2 border-b-gray-200">
                <div class="flex-1">
                    <Menu
                        label={selectedDomain()?.name || ''}
                        items={selectableDomains().map((d) => ({
                            label: d.name,
                            onClick: () => {
                                nav(`/domain/${d.id}`)
                            }
                        }))}
                        content={
                            <>
                                <div class="py-2">
                                    <a
                                        href="/domain/1/settings"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Domain Settings
                                    </a>
                                </div>
                            </>
                        }
                    />

                    <Button
                        class="ml-2"
                        label={'Manage Teams'}
                        onClick={() => {
                            fetchSelectableDomains()
                        }}
                    />
                </div>

                <div class="flex mr-2">
                    <UserMenu authUser={authUser()!} />
                </div>
            </div>

            <div class="flex-1">{props.children}</div>
        </div>
    )
}
