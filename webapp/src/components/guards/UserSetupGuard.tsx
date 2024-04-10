import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@state/stores/auth.store.ts'

export const UserSetupGuard = () => {
    console.debug('Running: UserSetupGuard')

    const { user } = useAuthStore()

    if (!user) {
        return <Navigate to={'/user-setup/about-you'} />
    }

    return <Outlet />
}
