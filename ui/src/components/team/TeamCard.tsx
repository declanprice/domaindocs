import { Menu } from '@components'

type TeamCardProps = {
    teamName: string
}

export const TeamCard = (props: TeamCardProps) => {
    return (
        <div class="max-w-sm mt-2 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <a
                    class="flex-1 underline text-md font-bold tracking-tight text-gray-900 dark:text-white"
                    href={'/domain/1/subdomain/1'}
                >
                    {props.teamName}
                </a>

                <Menu
                    iconButton={true}
                    label={`${props.teamName}-menu`}
                    items={[{ label: 'Remove', onClick: () => {} }]}
                />
            </div>
        </div>
    )
}
