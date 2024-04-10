import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useAuthStore } from '@state/stores/auth.store.ts'
import { useUiStore } from '@state/stores/ui.store.ts'

export const DomainGuard = () => {
    console.debug('Running: DomainGuard')

    const params = useParams()
    const setActiveDomain = useUiStore((a) => a.setActiveDomain)
    const { user } = useAuthStore()
    const location = useLocation()

    const domains = user?.domains

    if (!domains || !domains.length) {
        return <Navigate to={'/user-setup/create-domain'} />
    }

    const domainFromSlug = domains.find((d) => d.slug === params.domainSlug)

    let activeDomain = domains[0]

    if (domainFromSlug) {
        activeDomain = domainFromSlug
    }

    setActiveDomain(activeDomain)

    if (!location.pathname.includes(activeDomain.slug)) {
        return <Navigate to={`/domain/${activeDomain.slug}/home`} />
    }

    return <Outlet />
}
