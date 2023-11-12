import { AuthenticatedUser, Domain } from '@services'
import { Menu } from '@components'

type TopBarProps = {
    authUser: AuthenticatedUser
    selectableDomains: Domain[]
}

export const TopBar = (props: TopBarProps) => {
    const {} = props

    return (
        <div>
            <Menu
                label={'My Domain Name'}
                items={[{ label: 'option 1', onClick: () => {} }]}
            />
        </div>
    )
}
