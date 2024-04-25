import { ProjectOwnershipCard } from '../../../components/project-ownership/ProjectOwnershipCard';

import { ProjectOwnership as ProjectOwnershipData } from '@domaindocs/lib';

type ProjectOwnershipProps = {
    domainId: string;
    projectId: string;
    projectName: string;
    ownership: ProjectOwnershipData[];
};

export const ProjectOwnership = (props: ProjectOwnershipProps) => {
    const { domainId, projectId, projectName, ownership } = props;

    return <ProjectOwnershipCard ownership={ownership} />;
};
