import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useAuthStore } from '@state/stores/auth.store.ts'
import { useUiStore } from '@state/stores/ui.store.ts'

export const DomainGuard = () => {
    console.debug('Running: DomainGuard')

    const params = useParams()

    const { setActiveDomain } = useUiStore()

    const { user } = useAuthStore()

    const domains = user?.domains

    if (!domains || !domains.length) {
        return <Navigate to={'/user-setup/create-domain'} />
    }

    const targetDomain = domains.find((d) => d.slug === params?.domainSlug)

    const activeDomain = targetDomain ?? domains[0]

    setActiveDomain(activeDomain)

    return (
        <>
            <Navigate to={`/${activeDomain.slug}/home`} />
            <Outlet />
        </>
    )
}
