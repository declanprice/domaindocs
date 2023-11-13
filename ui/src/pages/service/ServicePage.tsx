import { Button, TeamCard } from '@components'
import { EditServiceNameModal } from './components/EditServiceNameModal.tsx'
import { EditServiceSummaryModal } from './components/EditServiceSummaryModal.tsx'
import { ServiceDependencyCard } from './components/ServiceDependencyCard.tsx'
import { ServiceTechCard } from './components/ServiceTechCard.tsx'

export const ServicePage = () => {
    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">Service - Customer API</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        data-modal-target="edit-service-name-modal"
                        data-modal-toggle="edit-service-name-modal"
                    >
                        Edit
                    </a>
                </div>

                <Button label={'Documentation'} />

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
                    Track work across the enterprise through an open,
                    collaborative platform. Link issues across Jira and ingest
                    data from other software development tools, so your IT
                    support and operations teams have richer contextual
                    information to rapidly respond to requests, incidents, and
                    changes.
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

                <TeamCard teamName={'Team Orion'} />

                <TeamCard teamName={'Team Keplar'} />
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

                <ServiceDependencyCard
                    dependencyName={'Customer API'}
                    direction={'uses'}
                />

                <ServiceDependencyCard
                    dependencyName={'Customer UI'}
                    direction={'uses'}
                />
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

                <ServiceTechCard techName={'React'} />

                <ServiceTechCard techName={'NodeJS'} />
            </div>
        </div>
    )
}
