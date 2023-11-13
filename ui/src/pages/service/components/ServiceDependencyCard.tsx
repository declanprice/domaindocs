import { Menu } from '@components'

type ServiceDependencyCardProps = {
    dependencyName: string
    direction: 'uses' | 'usedBy'
}

export const ServiceDependencyCard = (props: ServiceDependencyCardProps) => {
    const { dependencyName } = props

    return (
        <div class="max-w-sm mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <a
                    href={'/domain/1/subdomain/1'}
                    class="flex-1 underline text-md font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {dependencyName}
                </a>

                <Menu
                    iconButton={true}
                    label={`${dependencyName}-menu`}
                    items={[{ label: 'Remove', onClick: () => {} }]}
                />
            </div>
        </div>
    )
}
