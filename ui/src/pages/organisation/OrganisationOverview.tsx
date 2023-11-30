import { Paper } from '@components'

export const OrganisationOverview = () => {
    return (
        <>
            <h3 class="mt-12 mb-4 text-lg font-semibold text-primary">Details</h3>

            <div class="flex justify-between flex-wrap">
                <Paper class="p-2 w-[220px] text-center">30 People</Paper>
                <Paper class="p-2 w-[220px] text-center">5 Teams</Paper>
                <Paper class="p-2 w-[220px] text-center">3 Domains</Paper>
                <Paper class="p-2 w-[220px] text-center">15 Products</Paper>
            </div>

            <Paper class="mt-4 px-8 py-2 w-full">I am the domain summary</Paper>

            <h3 class="mt-12 mb-4 text-lg font-semibold text-primary">Contacts</h3>

            <div class="flex justify-between flex-wrap">
                <Paper class="p-2 h-[200px] w-[220px] text-center">30 People</Paper>
                <Paper class="p-2 h-[200px] w-[220px] text-center">5 Teams</Paper>
                <Paper class="p-2 h-[200px] w-[220px] text-center">3 Domains</Paper>
            </div>

            <h3 class="mt-12 mb-4 text-lg font-semibold text-primary">Important Documentation</h3>

            <div class="flex justify-between flex-wrap">
                <Paper class="p-2 h-[80px] w-[300px] text-center">30 People</Paper>
                <Paper class="p-2 h-[80px] w-[300px] text-center">5 Teams</Paper>
                <Paper class="p-2 h-[80px] w-[300px] text-center">3 Domains</Paper>
            </div>
        </>
    )
}
