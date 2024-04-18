import { apiClient } from './api-client';

import { ProjectDocumentation, SearchDocumentation } from '@domaindocs/lib';

export const documentationApi = (() => {
  const search = async (
    domainId: string,
    params: SearchDocumentation,
  ): Promise<ProjectDocumentation[]> => {
    const result = await apiClient.get<ProjectDocumentation[]>(
      `/domains/${domainId}/documentation`,
      {
        params,
      },
    );

    return result.data;
  };

  return {
    search,
  };
})();
