import { OwnershipCard } from '../../../components/cards/ownership/OwnershipCard';

import { ProjectOwnershipData } from '@domaindocs/lib';

type ProjectOwnershipProps = {
  domainId: string;
  projectId: string;
  projectName: string;
  ownership: ProjectOwnershipData;
};

export const ProjectOwnership = (props: ProjectOwnershipProps) => {
  const { domainId, projectId, projectName, ownership } = props;

  return <OwnershipCard ownership={ownership} />;
};
