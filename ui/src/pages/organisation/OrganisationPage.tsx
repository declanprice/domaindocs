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

    return (
        <div class="flex items-center gap-x-6 bg-gray-900 px-6 py-8 md:before:flex-1">
            <p class="text-sm leading-6 text-white">
                <a href="#">
                    <strong class="font-semibold text-xl">Organisation</strong>
                </a>
            </p>
            <div class="flex flex-1 justify-end"></div>
        </div>
    )
}
