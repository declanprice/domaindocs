import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SubdomainPageParams } from '../../pages/subdomain/SubdomainPageParams';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { SubdomainDto } from '@domaindocs/lib';

export const SubdomainGuard = () => {
  console.log('Running SubdomainGuard');

  const { domainId, subdomainId } = useParams() as SubdomainPageParams;

  const { data: subdomains, isLoading } = useQuery<SubdomainDto[]>({
    queryKey: ['searchSubdomains', { domainId }],
    queryFn: () => subdomainsApi.searchSubdomains(domainId),
  });

  if (isLoading || !subdomains) return null;

  if (!subdomains.length) {
    return <Navigate to={`/${domainId}/sd-create`} />;
  }

  if (!subdomainId) {
    const firstAvailableSubdomain = subdomains[0];

    return (
      <Navigate
        to={`/${domainId}/sd/${firstAvailableSubdomain.subdomainId}/overview`}
      />
    );
  }

  return <Outlet context={'subdomain-guard'} />;
};
