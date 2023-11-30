import { ParentProps } from 'solid-js'

export const PageContainer = (props: ParentProps) => {
    return (
        <div class="flex w-full items-center justify-center bg-secondary">
            <div style={{ width: '1000px' }}>{props.children}</div>
        </div>
    )
}
