import { ProjectSubdomain } from './project-subdomain';
import { ProjectTeam } from './project-team';
import { ProjectTechnology } from './project-technology';
import { Project } from '@domaindocs/lib';

export class DetailedProject {
  constructor(
    public project: Project,
    public subdomain: ProjectSubdomain,
    public team: ProjectTeam,
    public technologies: ProjectTechnology[],
  ) {}
}
