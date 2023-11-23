import { ParentProps } from 'solid-js'
import { Toolbar } from './Toolbar.tsx'

export const Layout = (props: ParentProps) => {
    return (
        <div class="flex flex-col h-full">
            <Toolbar />

            <div class="flex-1">{props.children}</div>
        </div>
    )
}
