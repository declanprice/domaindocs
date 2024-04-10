import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { CheckSession, useAuthStore } from '@state/stores/auth.store.ts'

export const noAuthGuardLoader = async (): Promise<boolean> => {
    return useAuthStore.getState()?.checkSession()
}

export const NoAuthGuard = () => {
    const hasSession = useLoaderData() as CheckSession

    if (hasSession) {
        return <Navigate to={'/'} />
    }

    return <Outlet />
}
