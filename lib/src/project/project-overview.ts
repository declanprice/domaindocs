import { ProjectSummary } from './project-summary';
import { ProjectOwnershipData } from './project-ownership-data';
import { ProjectContact } from './project-contact';
import { ProjectResourceLink } from './project-resource-link';

export class ProjectOverview {
  constructor(
    public summary: ProjectSummary,
    public ownership: ProjectOwnershipData,
    public contacts: ProjectContact[],
    public resourceLinks: ProjectResourceLink[],
  ) {}
}
