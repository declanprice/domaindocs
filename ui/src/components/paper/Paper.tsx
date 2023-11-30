import { ParentProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'

export const Paper = (props: { class?: string } & ParentProps) => {
    return <div class={twMerge('rounded-lg bg-white shadow', props.class)}>{props.children}</div>
}
