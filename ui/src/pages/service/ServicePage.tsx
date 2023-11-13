import { Button, TeamCard } from '@components'
import { EditServiceNameModal } from './components/EditServiceNameModal.tsx'
import { EditServiceSummaryModal } from './components/EditServiceSummaryModal.tsx'
import { ServiceDependencyCard } from './components/ServiceDependencyCard.tsx'
import { ServiceTechCard } from './components/ServiceTechCard.tsx'
import { useNavigate, useParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import {
    fetchServiceView,
    serviceView
} from '../../services/service-view.service.ts'

export const ServicePage = () => {
    const params = useParams()
    const nav = useNavigate()

    createEffect(() => {
        fetchServiceView(params.serviceId)
    })

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">
                        Service - {serviceView()?.name}
                    </h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="edit-service-name-modal"
                        data-modal-toggle="edit-service-name-modal"
                    >
                        Edit
                    </a>
                </div>

                <Button
                    label={'Documentation'}
                    onClick={() => {
                        nav(
                            `/documentation?domainId=${params.domainId}&subDomainId=${params.subDomainId}&serviceId=${params.serviceId}`
                        )
                    }}
                />
                <EditServiceNameModal />
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
                    {serviceView()?.summary}
                </p>
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Owned By</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-team-modal"
                        data-modal-toggle="add-team-modal"
                    >
                        Add
                    </a>
                </div>

                {serviceView()?.ownedBy.map((t) => (
                    <TeamCard teamName={t.name} />
                ))}
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Dependencies</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-service-modal"
                        data-modal-toggle="add-service-modal"
                    >
                        Add
                    </a>
                </div>

                {serviceView()?.dependencies.map((d) => (
                    <ServiceDependencyCard
                        domainId={d.domainId}
                        subDomainId={d.subDomainId}
                        serviceId={d.serviceId}
                        serviceName={d.name}
                        direction={d.direction}
                    />
                ))}
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Tech Stack</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="add-service-tech-modal"
                        data-modal-toggle="add-service-tech-modal"
                    >
                        Add
                    </a>
                </div>

                {serviceView()?.techStack.map((t) => (
                    <ServiceTechCard techName={t.name} />
                ))}
            </div>
        </div>
    )
}
