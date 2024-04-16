import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from '../../state/stores/auth.store';
import { useUiStore } from '../../state/stores/ui.store';

export const DomainGuard = () => {
  console.debug('Running: DomainGuard');

  const { domainId } = useParams();
  const domains = useAuthStore((state) => state.user?.domains);
  const setActiveDomain = useUiStore((state) => state.setActiveDomain);

  if (!domains?.length) {
    return <Navigate to={'/domains-setup'} />;
  }

  if (!domainId) {
    const firstAvailableDomain = domains[0];
    return <Navigate to={`/${firstAvailableDomain.domainId}/home`} />;
  }

  const activeDomain = domains.find((d) => d.domainId === domainId);

  if (!activeDomain) {
    return <Navigate to={'/page-not-found'} />;
  }

  setActiveDomain(activeDomain);

  return <Outlet context={'domain'} />;
};
