import { EditDomainNameModal } from './components/EditDomainNameModal.tsx'
import { EditDomainSummaryModal } from './components/EditDomainSummaryModal.tsx'
import { AddSubDomainModal } from './components/AddSubDomainModal.tsx'
import { SubDomainCard } from './components/SubDomainCard.tsx'
import { useNavigate, useParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { domainView, fetchDomainView } from '@services'
import { Button } from '@components'

export const DomainPage = () => {
    const params = useParams()

    const nav = useNavigate()

    createEffect(() => {
        fetchDomainView(params.domainId)
    })

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">
                        Domain - {domainView()?.name}
                    </h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="edit-domain-name"
                        data-modal-toggle="edit-domain-name"
                    >
                        Edit
                    </a>
                </div>

                <Button
                    label={'Documentation'}
                    onClick={() => {
                        nav(`/documentation?domainId=${params.domainId}`)
                    }}
                />

                <EditDomainNameModal />
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center">
                    <h1 class="text-md font-bold">Summary</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="edit-domain-summary"
                        data-modal-toggle="edit-domain-summary"
                    >
                        Edit
                    </a>

                    <EditDomainSummaryModal />
                </div>

                <p class="mt-2 mb-3 text-gray-500 dark:text-gray-400 w-2/5">
                    {domainView()?.summary}
                </p>
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Sub Domains</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-sub-domain-modal"
                        data-modal-toggle="add-sub-domain-modal"
                    >
                        Add
                    </a>

                    <AddSubDomainModal />
                </div>

                {domainView()?.subDomains.map((sd) => (
                    <SubDomainCard
                        subDomainName={sd.name}
                        servicesCount={sd.serviceCount}
                        teamCount={sd.teamCount}
                    />
                ))}
            </div>
        </div>
    )
}
