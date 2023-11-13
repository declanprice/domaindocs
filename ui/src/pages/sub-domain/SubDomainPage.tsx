import { EditDomainNameModal } from '../domain/components/EditDomainNameModal.tsx'
import { ServiceCard } from './components/ServiceCard.tsx'
import { Button, TeamCard } from '@components'
import { useNavigate, useParams } from '@solidjs/router'
import { EditServiceSummaryModal } from '../service/components/EditServiceSummaryModal.tsx'
import { createEffect } from 'solid-js'
import {
    fetchSubDomainView,
    subDomainView
} from '../../services/sub-domain-view.service.ts'

export const SubDomainPage = () => {
    const params = useParams()
    const nav = useNavigate()

    createEffect(() => {
        fetchSubDomainView(params.subDomainId)
    })

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">
                        Sub Domain - {subDomainView()?.name}
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
                        nav(
                            `/documentation?domainId=${params.domainId}&subDomainId=${params.subDomainId}`
                        )
                    }}
                />

                <EditDomainNameModal />
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center">
                    <h1 class="text-md font-bold">Summary</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="edit-service-summary-modal"
                        data-modal-toggle="edit-service-summary-modal"
                    >
                        Edit
                    </a>

                    <EditServiceSummaryModal />
                </div>

                <p class="mt-2 mb-3 text-gray-500 dark:text-gray-400 w-2/5">
                    {subDomainView()?.summary}
                </p>
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Teams</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-team-modal"
                        data-modal-toggle="add-team-modal"
                    >
                        Add
                    </a>
                </div>

                {subDomainView()?.teams.map((t) => (
                    <TeamCard teamName={t.name} />
                ))}
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Services</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-service-modal"
                        data-modal-toggle="add-service-modal"
                    >
                        Add
                    </a>
                </div>

                {subDomainView()?.services.map((s) => (
                    <ServiceCard serviceName={s.name} />
                ))}
            </div>
        </div>
    )
}
