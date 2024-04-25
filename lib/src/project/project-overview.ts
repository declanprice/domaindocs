import { ProjectLink } from './project-link';
import { ProjectOwnership } from './project-ownership';

export class ProjectOverview {
    constructor(
        public projectId: string,
        public name: string,
        public description: string,
        public ownership: ProjectOwnership,
        public links: ProjectLink[],
    ) {}
}
