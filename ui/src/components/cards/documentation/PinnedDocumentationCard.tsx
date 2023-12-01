import { Paper } from '@components'

type PinnedDocumentationCardProps = {
    id: string
    name: string
    type: string
}
export const PinnedDocumentationCard = (props: PinnedDocumentationCardProps) => {
    return (
        <Paper class="flex flex-col px-6 p-4 h-[100px] text-sm">
            <h5>{props.name}</h5>

            <div class="mt-auto flex">
                <div class="text-xs">{props.type}</div>
                <a class="ml-auto text-primary font-semibold text-xs">View</a>
            </div>
        </Paper>
    )
}
