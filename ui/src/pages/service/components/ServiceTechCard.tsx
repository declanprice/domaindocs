import { Menu } from '@components'

type ServiceTechCardProps = {
    techName: string
}

export const ServiceTechCard = (props: ServiceTechCardProps) => {
    const { techName } = props

    return (
        <div class="max-w-sm mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <a
                    href={'/domain/1/subdomain/1'}
                    class="flex-1 underline text-md font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {techName}
                </a>

                <Menu
                    iconButton={true}
                    label={`${techName}-menu`}
                    items={[{ label: 'Remove', onClick: () => {} }]}
                />
            </div>
        </div>
    )
}
