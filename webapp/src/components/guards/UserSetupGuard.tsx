import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../state/stores/auth.store';

export const UserSetupGuard = () => {
    console.debug('Running: UserSetupGuard');

    const [params] = useSearchParams();

    const acceptInvite = params.get('acceptInvite');

    const user = useAuthStore((state) => state.user);

    if (!user) {
        if (acceptInvite) {
            return <Navigate to={`/setup/user?acceptInvite${acceptInvite}`} />;
        }

        return <Navigate to={'/setup/user'} />;
    }

    return <Outlet context={'setup'} />;
};
