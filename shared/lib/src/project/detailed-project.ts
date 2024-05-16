import { Project, ProjectOwnership } from '@domaindocs/lib';

export class DetailedProject {
    constructor(
        public project: Project,
        public ownership: ProjectOwnership[],
    ) {}
}
