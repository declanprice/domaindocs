import { Menu } from '@components'
import { authUser, signOut } from '@services'

export const UserMenu = () => {
    return (
        <Menu
            trigger={
                <button class="" type="button">
                    <span class="sr-only">Open user menu</span>
                    <img
                        class="w-8 h-8 me-2 rounded-full"
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="user photo"
                    />
                </button>
            }
            content={
                <>
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div class="truncate">{authUser()?.email}</div>
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
    )
}
