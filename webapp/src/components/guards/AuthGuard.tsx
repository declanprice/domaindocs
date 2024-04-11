import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@state/stores/auth.store.ts'

export const AuthGuard = () => {
    console.debug('Running: AuthGuard')

    const { userId } = useAuthStore()

    if (!userId) {
        return <Navigate to={'/auth/sign-in'} />
    }

    return <Outlet context={'auth'} />
}
