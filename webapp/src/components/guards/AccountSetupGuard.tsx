import { useAuthStore } from '@stores/auth.store.ts'
import { Navigate, Outlet } from 'react-router-dom'

export const AccountSetupGuard = () => {
    const { user } = useAuthStore()

    if (!user) {
        return <Navigate to={'/account-setup/about-you'} />
    }

    return <Outlet />
}
