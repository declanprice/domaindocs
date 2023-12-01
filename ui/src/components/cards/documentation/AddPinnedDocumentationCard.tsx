import { Button, Paper } from '@components'

export const AddPinnedDocumentationCard = () => {
    return (
        <Paper class="flex p-2 h-[100px] text-center items-center justify-center">
            <Button label={'Pin'} class="text-xs" />
        </Paper>
    )
}
