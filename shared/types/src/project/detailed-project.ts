import { ProjectOwnership } from './project-ownership';
import { Project } from './project';

export class DetailedProject {
    constructor(
        public project: Project,
        public ownership: ProjectOwnership[],
    ) {}
}
