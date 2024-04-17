import { ProjectTechnology } from './project-technology';

export class ProjectSummary {
  constructor(
    readonly projectId: string,
    readonly name: string,
    readonly description: string,
    readonly technologies: ProjectTechnology[],
  ) {}
}
