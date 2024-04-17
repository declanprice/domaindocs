import { ProjectSummary } from './project-summary';
import { ProjectOwnership } from './project-ownership';
import { ProjectContact } from './project-contact';
import { ProjectResourceLink } from './project-resource-link';

export class ProjectOverview {
  constructor(
    public summary: ProjectSummary,
    public ownership: ProjectOwnership,
    public contacts: ProjectContact[],
    public resourceLinks: ProjectResourceLink[],
  ) {}
}
