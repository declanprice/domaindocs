import {
    AddContactCard,
    AddPinnedDocumentationCard,
    Paper,
    PersonContactCard,
    PinnedDocumentationCard
} from '@components'

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

            <div class="grid grid-cols-4 gap-4">
                <PersonContactCard
                    imageUrl={
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    firstName={'Declan'}
                    lastName={'Price'}
                    role={'Domain Architect'}
                    contactEmail={'declanprice1@gmail.com'}
                    contactNumber={'+44301239123'}
                />

                <PersonContactCard
                    imageUrl={
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    firstName={'Declan'}
                    lastName={'Price'}
                    role={'Domain Architect'}
                    contactEmail={'declanprice1@gmail.com'}
                    contactNumber={'+44301239123'}
                />

                <AddContactCard />
            </div>

            <h3 class="mt-12 mb-4 text-lg font-semibold text-primary">Important Docs</h3>

            <div class="grid grid-cols-3 gap-4">
                <PinnedDocumentationCard name={'Welcome to Domain!'} type={'Video'} id={'1'} />
                <PinnedDocumentationCard name={'AWS Architecture Overview'} type={'Document'} id={'2'} />
                <AddPinnedDocumentationCard />
            </div>
        </>
    )
}
