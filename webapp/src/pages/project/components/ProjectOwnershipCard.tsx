import { OwnershipCard } from '../../../components/ownership/OwnershipCard';

import { ProjectOwnership } from '@domaindocs/lib';

type ProjectOwnershipProps = {
    domainId: string;
    projectId: string;
    projectName: string;
    ownership: ProjectOwnership;
};

export const ProjectOwnershipCard = (props: ProjectOwnershipProps) => {
    const { domainId, projectId, projectName, ownership } = props;

    return <OwnershipCard ownership={ownership} />;
};
