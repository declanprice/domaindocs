import { ParentProps } from 'solid-js'

export const Layout = (props: ParentProps) => {
    return (
        <div class="flex flex-col h-full">
            <div class="flex m-4 pb-4 border-b-2 border-b-gray-200">
                <div class="flex-1"></div>
            </div>
            <div class="flex-1">{props.children}</div>
        </div>
    )
}
