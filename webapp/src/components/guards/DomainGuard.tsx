import { Navigate, Outlet, useParams } from 'react-router-dom'

import { useAuthStore } from '@state/stores/auth.store.ts'

export const DomainGuard = () => {
    console.debug('Running: DomainGuard')

    const params = useParams()

    const domains = useAuthStore((state) => state.user?.domains)

    if (!domains?.length) {
        return <Navigate to={'/user-setup/create-domain'} />
    }

    if (!params?.domainSlug) {
        const firstAvailableDomain = domains[0]
        return <Navigate to={`/${firstAvailableDomain.slug}/home`} />
    }

    const userHasDomain = domains.some((d) => d.slug === params.domainSlug)

    if (!userHasDomain) {
        return <Navigate to={'/page-not-found'} />
    }

    return <Outlet />
}
