import { EditDomainNameModal } from './components/EditDomainNameModal.tsx'
import { EditDomainSummaryModal } from './components/EditDomainSummaryModal.tsx'
import { AddSubDomainModal } from './components/AddSubDomainModal.tsx'
import { SubDomainCard } from './components/SubDomainCard.tsx'
import { Button } from '@components'
import { useNavigate, useParams } from '@solidjs/router'

export const DomainPage = () => {
    const params = useParams()

    const nav = useNavigate()

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">Domain - My Domain Name</h1>

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

                <SubDomainCard
                    subDomainName={'Restaurant'}
                    servicesCount={19}
                    teamCount={3}
                />

                <div class="m-2"></div>

                <SubDomainCard
                    subDomainName={'Order'}
                    servicesCount={12}
                    teamCount={2}
                />
            </div>
        </div>
    )
}
