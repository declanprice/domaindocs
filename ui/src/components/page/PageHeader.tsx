import { selectedOrganisation } from '@services'

export const PageHeader = () => {
    return (
        <div class="flex items-center justify-center p-5 bg-primary shadow-2xl">
            <div style={{ width: '1000px' }}>
                <div class="flex">
                    <h2 class="flex-1 font-bold text-2xl text-white">Organisation</h2>

                    <button class="bg-secondary text-md text-white font-semibold rounded-lg pl-6 pr-6 pb-2 pt-2">
                        Docs
                    </button>
                </div>

                <h5 class="text-white text-md mt-3">{selectedOrganisation()?.name}</h5>
            </div>
        </div>
    )
}
