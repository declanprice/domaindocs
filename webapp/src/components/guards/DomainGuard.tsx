import { Navigate, Outlet, useParams } from 'react-router-dom'

import { useAuthStore } from '@state/stores/auth.store.ts'
import { useUiStore } from '@state/stores/ui.store.ts'

export const DomainGuard = () => {
    console.debug('Running: DomainGuard')

    const params = useParams()
    const domains = useAuthStore((state) => state.user?.domains)
    const setActiveDomain = useUiStore((state) => state.setActiveDomain)

    if (!domains?.length) {
        return <Navigate to={'/domain-setup'} />
    }

    if (!params?.domainSlug) {
        const firstAvailableDomain = domains[0]
        return <Navigate to={`/${firstAvailableDomain.slug}/home`} />
    }

    const activeDomain = domains.find((d) => d.slug === params.domainSlug)

    if (!activeDomain) {
        return <Navigate to={'/page-not-found'} />
    }

    setActiveDomain(activeDomain)

    return <Outlet />
}
