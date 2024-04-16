import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../state/stores/auth.store';

export const NoAuthGuard = () => {
  console.debug('Running: NoAuthGuard');

  const { userId } = useAuthStore();

  if (userId) {
    return <Navigate to={'/'} />;
  }

  return <Outlet context={'no-auth'} />;
};
