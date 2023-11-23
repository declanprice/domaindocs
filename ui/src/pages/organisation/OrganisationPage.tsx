import { useNavigate, useParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { selectedOrganisation } from '@services'

export const OrganisationPage = () => {
    const params = useParams()

    const nav = useNavigate()

    createEffect(async () => {
        if (params.organisationId) {
            // await fetchOrganisation(params.organisationId)
        } else {
            nav(`/organisation/${selectedOrganisation()?.id}`)
        }
    })

    return <div class="flex flex-col p-4">asd</div>
}
