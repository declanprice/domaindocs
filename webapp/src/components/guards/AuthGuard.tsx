import { Navigate, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { CheckSession, useAuthStore } from '@state/stores/auth.store.ts'

export const authGuardLoader = async (): Promise<boolean> => {
    return useAuthStore.getState()?.checkSession()
}

export const AuthGuard = () => {
    const hasSession = useLoaderData() as CheckSession

    const location = useLocation()

    if (hasSession && location.pathname.includes('/auth')) {
        return <Navigate to={'/'} />
    }

    if (!hasSession) {
        return <Navigate to={'/auth/sign-in'} />
    }

    return <Outlet />
}
