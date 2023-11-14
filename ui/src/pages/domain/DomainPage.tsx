import { EditDomainNameModal } from './components/EditDomainNameModal.tsx'
import { EditDomainSummaryModal } from './components/EditDomainSummaryModal.tsx'
import { AddSubDomainModal } from './components/AddSubDomainModal.tsx'
import { SubDomainCard } from './components/SubDomainCard.tsx'
import { useNavigate, useParams } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { domainView, fetchDomainView } from '@services'
import { Button } from '@components'

export const DomainPage = () => {
    const [isEditNameModalOpen, setIsEditNameModalOpen] = createSignal(false)

    const [isAddSubDomainModalOpen, setIsAddSubDomainModalOpen] = createSignal(false)

    const params = useParams()

    const nav = useNavigate()

    createEffect(() => {
        fetchDomainView(params.domainId)
    })

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">Domain - {domainView()?.name}</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        onClick={() => {
                            setIsEditNameModalOpen(true)
                        }}
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

                <EditDomainNameModal
                    isOpen={isEditNameModalOpen()}
                    onClose={() => {
                        setIsEditNameModalOpen(false)
                    }}
                />
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

                <p class="mt-2 mb-3 text-gray-500 dark:text-gray-400 w-2/5">{domainView()?.summary}</p>
            </div>

            <div class="flex flex-col mt-8">
                <div class="flex items-center mb-2">
                    <h1 class="text-md font-bold">Sub Domains</h1>

                    <a
                        class="ml-4 text-blue-500 cursor-pointer underline text-sm"
                        onClick={() => {
                            setIsAddSubDomainModalOpen(true)
                        }}
                    >
                        Add
                    </a>

                    <AddSubDomainModal
                        isOpen={isAddSubDomainModalOpen()}
                        onClose={() => {
                            setIsAddSubDomainModalOpen(false)
                        }}
                    />
                </div>

                {domainView()?.subDomains.map((sd) => (
                    <SubDomainCard
                        onClick={() => {
                            nav(`/domain/${domainView()?.id}/subdomain/${sd.subDomainId}`)
                        }}
                        subDomainName={sd.name}
                        servicesCount={sd.serviceCount}
                        teamCount={sd.teamCount}
                    />
                ))}
            </div>
        </div>
    )
}
