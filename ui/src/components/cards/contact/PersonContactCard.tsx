import { Paper } from '../../paper/Paper.tsx'

type PersonContactCardProps = {
    id?: string
    imageUrl?: string
    firstName: string
    lastName: string
    role: string
    contactEmail?: string
    contactNumber?: string
}

export const PersonContactCard = (props: PersonContactCardProps) => {
    return (
        <Paper class="flex flex-col px-6 py-4 h-[160px] text-xs">
            <div class="flex items-center">
                <img class="inline-block h-8 w-8 rounded-full" src={props.imageUrl} alt="" />

                <div class="flex flex-col ml-3">
                    <h5 class="font-semibold">
                        {props.firstName} {props.lastName}
                    </h5>
                    <span class="mt-1">{props.role}</span>
                </div>
            </div>

            <div class="mt-4">{props.contactEmail}</div>

            <div class="mt-2">{props.contactNumber}</div>

            <div class="mt-auto ml-auto">
                <a class="text-primary font-semibold">View</a>
            </div>
        </Paper>
    )
}
