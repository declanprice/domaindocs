import { Paper } from '../../paper/Paper.tsx'
import { Button } from '../../button/Button.tsx'

export const AddContactCard = () => {
    return (
        <Paper class="flex flex-col px-6 py-4 h-[160px] items-center justify-center">
            <Button label={'Add Contact'} />
        </Paper>
    )
}
