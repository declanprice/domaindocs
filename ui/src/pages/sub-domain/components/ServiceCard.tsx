import { Menu } from '@components'

type ServiceCardProps = {
    serviceName: string
}

export const ServiceCard = (props: ServiceCardProps) => {
    const { serviceName } = props

    return (
        <div class="max-w-sm mt-2  p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <a
                    href={'/domain/1/subdomain/1/service/1'}
                    class="flex-1 underline text-md font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {serviceName}
                </a>

                <Menu
                    iconButton={true}
                    label={`${serviceName}-menu`}
                    items={[{ label: 'Remove', onClick: () => {} }]}
                />
            </div>
        </div>
    )
}
