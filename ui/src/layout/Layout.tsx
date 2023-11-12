import { ParentProps } from 'solid-js'
import { authService } from '@services'
import { TopBar } from './TopBar.tsx'

export const Layout = (props: ParentProps) => {
    const authUser = authService.authUser()

    if (!authUser) return null

    return (
        <div class="flex flex-col h-full">
            <TopBar authUser={authUser} selectableDomains={[]} />

            <div class="flex-1">{props.children}</div>
        </div>
    )
}
