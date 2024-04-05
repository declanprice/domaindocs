import { useAuthStore } from '@stores/auth.store.ts'
import { Navigate, Outlet } from 'react-router-dom'

export const UserSetupGuard = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to={'/user-setup/about-you'} />
    }

    return <Outlet/>
}