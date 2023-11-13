import { Menu } from '@components'

type SubDomainCardProps = {
    subDomainName: string
    teamCount: number
    servicesCount: number
}

export const SubDomainCard = (props: SubDomainCardProps) => {
    const { subDomainName, teamCount, servicesCount } = props

    return (
        <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <a
                    href={'/domain/1/subdomain/1'}
                    class="flex-1 underline text-md font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    {subDomainName}
                </a>
                <Menu
                    iconButton={true}
                    label={`${subDomainName}-menu`}
                    items={[{ label: 'Remove', onClick: () => {} }]}
                />
            </div>

            <div class="flex flex-col mt-2">
                <span class="text-sm">{teamCount} Teams</span>
                <span class="text-sm">{servicesCount} Services</span>
            </div>
        </div>
    )
}
