import { EditDomainNameModal } from '../domain/components/EditDomainNameModal.tsx'
import { ServiceCard } from './components/ServiceCard.tsx'
import { Button, TeamCard } from '@components'
import { useNavigate, useParams } from '@solidjs/router'

export const SubDomainPage = () => {
    const params = useParams()
    const nav = useNavigate()

    return (
        <div class="flex flex-col p-4">
            <div class="flex items-center">
                <div class="flex-1 flex items-center">
                    <h1 class="text-lg font-bold">Sub Domain - Order</h1>

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

                <TeamCard teamName={'Team Orion'} />

                <TeamCard teamName={'Team Keplar'} />
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

                <ServiceCard serviceName={'Order API'} />

                <ServiceCard serviceName={'Order UI'} />
            </div>
        </div>
    )
}
