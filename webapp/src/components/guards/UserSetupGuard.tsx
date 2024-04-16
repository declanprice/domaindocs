import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../state/stores/auth.store';

export const UserSetupGuard = () => {
  console.debug('Running: UserSetupGuard');

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to={'/users-setup'} />;
  }

  return <Outlet context={'user-setup'} />;
};
