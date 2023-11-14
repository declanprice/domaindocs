import { AuthenticatedUser, signOut } from '@services'
import { Menu } from '@components'

type UserMenuProps = {
    authUser: AuthenticatedUser
}

export const UserMenu = (props: UserMenuProps) => {
    const { authUser } = props

    return (
        <>
            <Menu
                trigger={
                    <button
                        class="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                        id="dropdownAvatarNameButton"
                        data-dropdown-toggle="dropdownAvatarName"
                        type="button"
                    >
                        <span class="sr-only">Open user menu</span>
                        <img
                            class="w-8 h-8 me-2 rounded-full"
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="user photo"
                        />
                        {authUser.displayName}
                        <svg
                            class="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                }
                content={
                    <>
                        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div class="truncate">{authUser.email}</div>
                        </div>
                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                        >
                            <li>
                                <a
                                    href="/settings"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Settings
                                </a>
                            </li>
                        </ul>
                        <div class="py-2">
                            <a
                                onClick={() => {
                                    signOut()
                                }}
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </div>
                    </>
                }
            />
        </>
    )
}
