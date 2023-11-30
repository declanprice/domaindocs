import { ParentProps } from 'solid-js'

export const PageContainer = (props: ParentProps) => {
    return (
        <div class="flex w-full items-center justify-center p-6" style={{ 'background-color': '#eaeaea' }}>
            <div style={{ width: '1000px' }}>{props.children}</div>
        </div>
    )
}
